import React from 'react';
import styled from 'styled-components';
import LoginModal from '../auth/LoginModal';
import SignupModal from '../auth/SignupModal';
import { ButtonAlt } from '../StyledComponents';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session'

const Bar = styled.div`
    background: lightblue;
    display: flex;
    height: 50px;
    justify-content: center;
`

const SplashNav = styled.nav`
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: space-between;
    max-width: 85%;
    width: 900px;
`;

const NavButtonContainer = styled.div`
    display: flex;
    align-items: center;
`

const Title = styled.h1`
    font-weight: normal;
`

const SplashNavBar = () => {
    const dispatch = useDispatch()

    const handleDemoLogin = async (e) => {
        e.preventDefault()
        await dispatch(login('demo@aa.io', 'password'));
    }


    return (
        <Bar>
        <SplashNav>
            <Title>rBoard</Title>
            <NavButtonContainer>
                <LoginModal />

                <SignupModal />

                <ButtonAlt onClick={handleDemoLogin}>Demo Login</ButtonAlt>
            </NavButtonContainer>

        </SplashNav>
        </Bar>
    );
}

export default SplashNavBar;
