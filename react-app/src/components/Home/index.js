import styled from "styled-components";
import NavBar from "../NavBar";


const HomeContainer = styled.div`
    position: relative;
`;

const Home = () => {


    return (
        <HomeContainer>
            <NavBar />
            <h1> Home </h1>

        </HomeContainer>
    )
}

export default Home;
