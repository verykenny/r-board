
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import WhiteBoard from "./WhiteBoard";


const WhiteBoardsContainer = styled.div`
    width: 100%;
    height: 600px;
    max-height: 65%;
    padding: 60px 20px;
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
                console.log(errors);
            }
            setBoards(data.boards)
        })()

    }, [user.id, errors])


    return (
        <WhiteBoardsContainer>
            <h2>Whiteboards</h2>
            {boards && boards.map(board => (
                <WhiteBoard key={board.id} board={board} />
            ))}
        </WhiteBoardsContainer>
    )
}





export default WhiteBoards;
