import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import styled from 'styled-components';

export const SplashNav = styled.nav`
    background: lightblue;
    display: flex;
    height: 50px;
`;

const SplashNavBar = () => {
    return (
        <SplashNav>

                    <NavLink to='/login' exact={true} activeClassName='active'>
                        Login
                    </NavLink>

                    <NavLink to='/sign-up' exact={true} activeClassName='active'>
                        Sign Up
                    </NavLink>

                    <NavLink to='/login' exact={true} activeClassName='active'>
                        Demo Login
                    </NavLink>

                    <LogoutButton />

        </SplashNav>
    );
}

export default SplashNavBar;
