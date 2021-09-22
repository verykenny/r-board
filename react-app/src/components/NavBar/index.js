import React, { useState } from 'react';
import styled from 'styled-components';
import FlyOut from './FlyOut';

const NavSideBar = styled.nav`
    background: #F06449;
    position: absolute;
    height: 100vh;
    display: flex;


    .fa-bars {
        font-size: 40px;
        padding: 10px;
    }
`;


const NavBar = () => {
    const [showFlyOut, setShowFlyOut] = useState(false)

    return (
        <NavSideBar>
            <i className="fas fa-bars" onClick={() => setShowFlyOut(prev => !prev)}></i>
            {showFlyOut && (
                <FlyOut />
            )}
        </NavSideBar>
    );
}

export default NavBar;
