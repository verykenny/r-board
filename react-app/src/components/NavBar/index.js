import React, { useState } from 'react';
import styled from 'styled-components';
import FlyOut from './FlyOut';

const NavSideBar = styled.nav`
    background: #363635;
    color: white;
    display: flex;
    height: 100vh;
    position: absolute;


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
