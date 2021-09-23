import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useBoardType from "../../context/Board";
import NavBar from "../NavBar";


const HomeContainer = styled.div`
    position: relative;
    background-image: url('https://pseudogram-bucket.s3.amazonaws.com/bg-whiteboard.png');
    background-size: 100vw 100vh;
    height: 100vh;
    width: 100vw;
`;

const Home = () => {
    const [errors, setErrors] = useState(null)
    const [whiteboard, setWhiteboard] = useState(null)
    const { displayBoard } = useBoardType()
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(displayBoard);
        (async () => {
            if (displayBoard) {
                const response = await fetch(`/api/boards/${displayBoard}`)
                const data = await response.json()
                if (data.errors) {
                    setErrors(data.errors)
                    console.log(errors);
                } else {
                    setWhiteboard(data.boardItems)
                }
            }
        })()

    }, [dispatch, displayBoard, errors])

    return (
        <HomeContainer>
            <NavBar />
            {whiteboard && <h1>WHITCH A BIG HELLO!</h1>}
        </HomeContainer>
    )
}

export default Home;
