import styled from "styled-components"
import { Button, FlyOutContainer } from "../StyledComponents";
import { CSSTransition } from 'react-transition-group'
import { useState, useEffect, useRef } from "react";


const UserSearchFlyoutContainer = styled(FlyOutContainer)`
    width: 350px;
    padding: 40px 20px;
    padding-left: 70px;
`;

const PositionedContainer = styled.div`
    position: fixed;
    left: 300px;
    top: 0px;
    z-index: -1;
`;


function UserSearchFlyout() {
    const [userSearchToggle, setUserSearchToggle] = useState('')

    return (
        <>
            <Button onClick={() => setUserSearchToggle(prev => !prev)}>User Search</Button>
            <PositionedContainer>
                <CSSTransition
                    in={userSearchToggle}
                    timeout={300}
                    classNames='second-flyout'
                    unmountOnExit
                >
                    <UserSearch setUserSearchToggle={setUserSearchToggle} />
                </CSSTransition>
            </PositionedContainer>
        </>
    )
}


function UserSearch({setUserSearchToggle}) {
    const clickCheck = useRef(null)
    const ClickChecker = (ref) => {
        useEffect(() => {
            const handleCloseOptions = (e) => {
                if (ref.current && !ref.current.contains(e.target)) {
                    setUserSearchToggle(false)

                }
            }
            document.addEventListener("mousedown", handleCloseOptions);
            return () => {
                document.removeEventListener("mousedown", handleCloseOptions);
            };
        })
    }
    ClickChecker(clickCheck)

    return (
        <UserSearchFlyoutContainer ref={clickCheck}>
            
        </UserSearchFlyoutContainer>
    )
}



export default UserSearchFlyout
