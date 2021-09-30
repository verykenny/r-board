import styled from "styled-components";
import { FlyOutContainer } from "../StyledComponents";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Button } from "../StyledComponents";

const ViewUsersFlyoutContainer = styled(FlyOutContainer)`
    width: 350px;
    padding: 40px 20px;
    padding-left: 70px;
`;

const BoardUserContainer = styled.div`
    color: white;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const UsersConatiner = styled.div`
    margin-bottom: 50px;
`;

const SectionTitle = styled.h2`
    margin-bottom: 10px;
`;

const SideMenuOption = styled(Button)`
    margin: 5px;
    background: transparent;
    border: none;

    &:hover {
        color: #2D75FC;
    }
`;

const SideMenuDeleteButton = styled(SideMenuOption)`
    &:hover {
        color: #F06449;
    }
`;

function ViewUsersFlyout({ board, setViewUsersToggle }) {
    const [boardUsers, setBoardUsers] = useState(null)
    const user = useSelector(state => state.session.user)
    const clickCheck = useRef(null)
    const ClickChecker = (ref) => {
        useEffect(() => {
            const handleCloseOptions = (e) => {
                if (ref.current && !ref.current.contains(e.target)) {
                    setViewUsersToggle(prev => !prev)

                }
            }
            document.addEventListener("mousedown", handleCloseOptions);
            return () => {
                document.removeEventListener("mousedown", handleCloseOptions);
            };
        })
    }
    ClickChecker(clickCheck)


    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/board_users/users/${user.id}/boards/${board.id}`)
            const data = await response.json()
            if (data.errors) {
                console.log(data.errors);
            } else {
                setBoardUsers(data.boardUsers)
            }
        })()

    }, [board.id, user.id])



    return (
        <ViewUsersFlyoutContainer ref={clickCheck}>
            <UsersConatiner>
                <SectionTitle>Granted Access</SectionTitle>
                {boardUsers && boardUsers.filter(boardUser => boardUser.verified === true && boardUser.user.id !== user.id).map(boardUser => (
                    <BoardUser key={boardUser.user.id} boardUser={boardUser} setBoardUsers={setBoardUsers} board={board}></BoardUser>
                    ))}
            </UsersConatiner>
            <UsersConatiner>
                <SectionTitle>Requested Access</SectionTitle>
                {boardUsers && boardUsers.filter(boardUser => boardUser.verified !== true).map(boardUser => (
                    <BoardUser key={boardUser.user.id} boardUser={boardUser} setBoardUsers={setBoardUsers} board={board}></BoardUser>
                    ))}
            </UsersConatiner>
        </ViewUsersFlyoutContainer>
    )
}



function BoardUser({ boardUser, setBoardUsers, board }) {

    const handleRemoveUser = () => {
        (async () => {
            const response = await fetch(`/api/board_users/users/${boardUser.user.id}/boards/${boardUser.board.id}`, {method: 'DELETE'})
            const data = await response.json()
            if (data.errors) {
                console.log(data.errors);
            } else {
                setBoardUsers(prev => prev.filter(listedBoardUser => listedBoardUser.user.id !== boardUser.user.id))
            }
        })()
    }

    const handleApproveUser = () => {
        (async () => {
            const response = await fetch(`/api/board_users/users/${boardUser.user.id}/boards/${boardUser.board.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    verified: true
                })
            })
            const data = await response.json()
            if (data.errors) {
                console.log(data.errors);
            } else {
                setBoardUsers(prev => prev.map(listedBoardUser => {
                    if (listedBoardUser.user.id === boardUser.user.id) {
                        listedBoardUser.verified = true;
                    }
                    return listedBoardUser
                }))
            }
        })()
    }

    return (
        <BoardUserContainer>
            {boardUser.owner && <p>{boardUser.user.username} - owner</p>}
            {!boardUser.owner && boardUser.user.username}
            {(boardUser.verified && board.owner) && (
                <SideMenuDeleteButton onClick={handleRemoveUser}>Remove</SideMenuDeleteButton>
            )}
            {(!boardUser.verified && board.owner) && (
                <SideMenuOption onClick={handleApproveUser}>Approve</SideMenuOption>
            )}
        </BoardUserContainer>
    )
}


export default ViewUsersFlyout
