
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";


const WhiteBoardsContainer = styled.div`
background: #D8E2DC;
width: 100%;
height: 600px;
max-height: 65%;
`;


const WhiteBoards = () => {
    const user = useSelector(state => state.session.user)
    const [boards, setBoards] = useState(null)
    const [errors, setErrors] = useState(null)

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/users/${user.id}/boards`)
            const data = await response.json()
            if (data.errors) {
                setErrors(data.errors)
            }
            setBoards(data.boards)
        })()
    })

    return (
        <WhiteBoardsContainer>
            <h2>Whiteboards</h2>
            {boards && boards.map(board => (
                <WhiteBoard key={board.id} board={board} />
            ))}
        </WhiteBoardsContainer>
    )
}



const WhiteBoard = ({ board }) => {

    return (
        <p>{board.name}</p>
    )
}

export default WhiteBoards;
