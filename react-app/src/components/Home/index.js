import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useBoardType from "../../context/Board";
import NavBar from "../NavBar";


const HomeContainer = styled.div`
    position: relative;
    background-image: url(${props => props.backgroundUrl});
    background-size: 100vw 100vh;
    height: 100vh;
    width: 100vw;
`;

const Home = () => {
    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState(null)
    const { displayBoard, setDisplayBoard } = useBoardType()
    const dispatch = useDispatch()

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

    }, [dispatch, setDisplayBoard, displayBoard, errors, user.id])

    return (
        <HomeContainer backgroundUrl={displayBoard?.backgroundUrl}>
            <NavBar />
            {displayBoard && <h1>YOU HAVE A WHITEBOARD!!!!!</h1>}
        </HomeContainer>
    )
}

export default Home;
