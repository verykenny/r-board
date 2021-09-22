import MainContent from "./MainContent"
import SplashNavBar from "./SplashNavBar"
import styled from 'styled-components';
import Footer from "./Footer";

const SplashContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`


const Splash = () => {
    return (
        <SplashContainer>
            <SplashNavBar />
            <MainContent />
            <Footer />
        </SplashContainer>
    )
}

export default Splash
