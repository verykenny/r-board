import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';


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

const Title = styled.h1`
`

const SplashNavBar = () => {
    return (
        <Bar>
        <SplashNav>
            <Title>rBoard</Title>
            <div>
                <NavLink to='/login' exact={true} activeClassName='active'>
                    Login
                </NavLink>

                <NavLink to='/sign-up' exact={true} activeClassName='active'>
                    Sign Up
                </NavLink>

                <NavLink to='/login' exact={true} activeClassName='active'>
                    Demo Login
                </NavLink>
            </div>

        </SplashNav>
        </Bar>
    );
}

export default SplashNavBar;
