import MainContent from "./MainContent"
import SplashNavBar from "./SplashNavBar"
import styled from 'styled-components';
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

const SplashContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`


const Splash = () => {
    const user = useSelector(state => state.session.user)

    if (user) {
        return  (<Redirect to='/home' />)
    }


    return (
        <SplashContainer>
            <SplashNavBar />
            <MainContent />
            <Footer />
        </SplashContainer>
    )
}

export default Splash
