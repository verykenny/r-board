import styled from 'styled-components';
import LogoutButton from '../auth/LogoutButton';
import WhiteBoards from './WhiteBoards';
import { FlyOutContainer } from '../StyledComponents'
import AddNewItem from './AddNewItem'
import { useEffect, useRef } from 'react';

import './FlyOut.css'


import AddNewBoard from './AddNewBoard';
import useBoardType from '../../context/Board';



const MenuOptionsContainer = styled.div`
    background: #363635;
    flex: 1 1 auto;

`;


const FlyOut = ({ setShowFlyOut }) => {
    const { displayBoard } = useBoardType()

    const clickCheck = useRef(null)
    const ClickChecker = (ref) => {
        useEffect(() => {
            const handleCloseOptions = (e) => {
                if (ref.current && !ref.current.contains(e.target)) {
                    setShowFlyOut(prev => !prev)

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
        <FlyOutContainer ref={clickCheck}>
            <WhiteBoards />
            <MenuOptionsContainer>
                <LogoutButton />
                <AddNewBoard />
                {displayBoard && <AddNewItem />}
            </MenuOptionsContainer>
        </FlyOutContainer>
    )
}




export default FlyOut;
