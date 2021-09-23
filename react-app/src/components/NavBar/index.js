import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import FlyOut from './FlyOut';
import { CSSTransition } from 'react-transition-group'


const NavSideBar = styled.nav`
    background: #363635;
    color: white;
    display: flex;
    height: 100vh;
    position: absolute;
    z-index: 100;

    .fa-bars {
        font-size: 40px;
        padding: 10px;
    }
`;

const PositionedContainer = styled.div`
    position: absolute;
    left: 50px;
    z-index: 50;
`;

const NavBar = () => {
    const [showFlyOut, setShowFlyOut] = useState(false)



    return (
        <>
            <NavSideBar>
                <i className="fas fa-bars" onClick={() => setShowFlyOut(prev => !prev)}></i>
            </NavSideBar>

            <PositionedContainer>
                <CSSTransition
                    in={showFlyOut}
                    timeout={300}
                    classNames='main-flyout'
                    unmountOnExit
                    >
                    <div classNames='main-flyout'>
                        <FlyOut />
                    </div>
                </CSSTransition>
            </PositionedContainer>
        </>
    );
}

export default NavBar;
