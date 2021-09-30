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
                    <BoardUser key={boardUser.user.id} boardUser={boardUser}></BoardUser>
                ))}
            </UsersConatiner>
            <UsersConatiner>
                <SectionTitle>Requested Access</SectionTitle>
                {boardUsers && boardUsers.filter(boardUser => boardUser.verified !== true).map(boardUser => (
                    <BoardUser key={boardUser.user.id} boardUser={boardUser}></BoardUser>
                ))}
            </UsersConatiner>
        </ViewUsersFlyoutContainer>
    )
}



function BoardUser({ boardUser }) {
    return (
        <BoardUserContainer>
            {boardUser.user.username}
            {boardUser.verified && (
                <SideMenuDeleteButton>Remove</SideMenuDeleteButton>
            )}
            {!boardUser.verified && (
                <SideMenuOption>Approve</SideMenuOption>
            )}
        </BoardUserContainer>
    )
}


export default ViewUsersFlyout
