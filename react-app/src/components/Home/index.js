import styled from "styled-components";
import NavBar from "../NavBar";


const HomeContainer = styled.div`
    position: relative;
    background-image: url('https://pseudogram-bucket.s3.amazonaws.com/bg-whiteboard.png');
    background-size: 100vw 100vh;
    height: 100vh;
    width: 100vw;
`;

const Home = () => {


    return (
        <HomeContainer>
            <NavBar />

        </HomeContainer>
    )
}

export default Home;
