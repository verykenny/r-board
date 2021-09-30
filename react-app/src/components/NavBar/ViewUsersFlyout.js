import styled from "styled-components";
import { FlyOutContainer } from "../StyledComponents";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ViewUsersFlyoutContainer = styled(FlyOutContainer)`
    width: 350px;
    padding: 40px 20px;
    padding-left: 70px;
`;

const BoardUserContainer = styled.div`
    color: white;
    margin-bottom: 5px;
`;

const UsersConatiner = styled.div`
    margin-bottom: 50px;
`;

const SectionTitle = styled.h2`
    margin-bottom: 10px;
`;


function ViewUsersFlyout({ board, setViewUsersToggle }) {
    const [boardUsers, setBoardUsers] = useState(null)
    const user = useSelector(state => state.session.user)


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
        <ViewUsersFlyoutContainer>
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
        </BoardUserContainer>
    )
}


export default ViewUsersFlyout
