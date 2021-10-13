import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useBoardType from "../../context/Board";
import NavBar from "../NavBar";
import DisplayBoardData from "../DisplayBoardData";


const HomeContainer = styled.div`
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    `;


const DisplayContainer = styled.div`
    margin-left: 50px;
    background-image: url(${props => props.backgroundUrl});
    background-size: 100% 100%;
    height: 100vh;
    width: 100vw;
`;

const Home = () => {
    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState(null)
    const { displayBoard, setDisplayBoard, displayBoardData, setDisplayBoardData } = useBoardType()

    useEffect(() => {
        (async () => {
            if (!displayBoard) {
                const response = await fetch(`/api/users/${user.id}/boards`)
                const data = await response.json()
                if (data.errors) {
                    setErrors(data.errors)
                    console.log(errors);
                }
                setDisplayBoard(data.boards[0] || null)
            }
        })()

    }, [setDisplayBoard, displayBoard, errors, user.id])

    useEffect(() => {
        (async () => {
            if (displayBoard) {
                const response = await fetch(`/api/boards/${displayBoard.id}`)
                const data = await response.json()
                if (data.errors) {
                    setErrors(data.errors)
                    console.log(errors);
                }
                setDisplayBoardData(data.boardItems)
            }
        })()

    }, [displayBoard, setDisplayBoardData, errors])

    return (
        <HomeContainer>
            <NavBar />
            <DisplayContainer backgroundUrl={displayBoard?.backgroundUrl}>
                {displayBoardData && <DisplayBoardData />}
            </DisplayContainer>
        </HomeContainer>
    )
}

export default Home;
