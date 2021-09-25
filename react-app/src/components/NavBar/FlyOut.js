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
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 60px 20px;
`;


const FlyOut = ({ setShowFlyOut }) => {
    const { displayBoard } = useBoardType()



    return (
        <FlyOutContainer>
            <WhiteBoards />
            <MenuOptionsContainer>
                {displayBoard && <AddNewItem />}
                <AddNewBoard />
                <LogoutButton />
            </MenuOptionsContainer>
        </FlyOutContainer>
    )
}




export default FlyOut;
