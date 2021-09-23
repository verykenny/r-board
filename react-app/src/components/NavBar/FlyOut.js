import styled from 'styled-components';
import LogoutButton from '../auth/LogoutButton';
import WhiteBoards from './WhiteBoards';
import { FlyOutContainer } from '../StyledComponents'

import './FlyOut.css'



const MenuOptionsContainer = styled.div`
    background: #363635;
    flex: 1 1 auto;

`;

const MainFlyoutContainer = styled(FlyOutContainer)`
    margin-left: 45px;
`;


const FlyOut = ({ showFlyOut }) => {
    return (
        <MainFlyoutContainer>
            <WhiteBoards />
            <MenuOptionsContainer>
                <LogoutButton />
            </MenuOptionsContainer>
        </MainFlyoutContainer>
    )
}

export default FlyOut;
