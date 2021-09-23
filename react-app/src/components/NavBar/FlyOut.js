import styled from 'styled-components';
import LogoutButton from '../auth/LogoutButton';
import WhiteBoards from './WhiteBoards';
import { FlyOutContainer } from '../StyledComponents'

import './FlyOut.css'



const MenuOptionsContainer = styled.div`
    background: #363635;
    flex: 1 1 auto;

`;


const FlyOut = ({ showFlyOut }) => {
    return (
    <div className='main-flyout'>
        <FlyOutContainer>
            <WhiteBoards />
            <MenuOptionsContainer>
                <LogoutButton />
            </MenuOptionsContainer>
        </FlyOutContainer>
    </div>
    )
}

export default FlyOut;
