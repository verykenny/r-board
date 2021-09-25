import styled from 'styled-components';
import LogoutButton from '../auth/LogoutButton';
import WhiteBoards from './WhiteBoards';
import { FlyOutContainer } from '../StyledComponents'
import AddNewItem from './AddNewItem'

import './FlyOut.css'


import AddNewBoard from './AddNewBoard';
import useBoardType from '../../context/Board';



const MenuOptionsContainer = styled.div`
    background: #363635;
    flex: 1 1 auto;

`;


const FlyOut = ({ showFlyOut }) => {
    const { displayBoard } = useBoardType()
    return (
        <FlyOutContainer>
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
