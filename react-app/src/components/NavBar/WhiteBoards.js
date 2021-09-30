
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useBoardsType from "../../context/Boards";
import WhiteBoard from "./WhiteBoard";


const WhiteBoardsContainer = styled.div`
    width: 100%;
    height: 600px;
    max-height: 65%;
    padding: 60px 20px;
`;

const SectionNameContainer = styled.h2`
`;
const SectionNameContainerTwo = styled.h2`
    margin-top: 50px;
`;

const WhiteBoards = () => {
    const user = useSelector(state => state.session.user)
    const { usersBoards, setUsersBoards } = useBoardsType();
    const [errors, setErrors] = useState(null)

    useEffect(() => {
        (async () => {
            if (! usersBoards) {
                const response = await fetch(`/api/users/${user.id}/boards`)
                const data = await response.json()
                if (data.errors) {
                    setErrors(data.errors)
                    console.log(errors);
                } else {
                    setUsersBoards(data.boards)
                }

            }
        })()
    }, [user.id, errors, setUsersBoards, usersBoards])

    return (
        <WhiteBoardsContainer>
            <SectionNameContainer>Your Whiteboards</SectionNameContainer>
            {usersBoards && usersBoards.filter(board => board.owner).map(board => (
                <WhiteBoard key={board.id} board={board} />
            ))}
            <SectionNameContainerTwo>Other's Whiteboards</SectionNameContainerTwo>
            {usersBoards && usersBoards.filter(board => board.owner === false).map(board => (
                <WhiteBoard key={board.id} board={board} />
            ))}
        </WhiteBoardsContainer>
    )
}





export default WhiteBoards;
