import styled from 'styled-components';
import LogoutButton from '../auth/LogoutButton';
import WhiteBoards from './WhiteBoards';


const FlyOutContainer = styled.div`
    height: 100vh;
    width: 300px;
    display: flex;
    flex-direction: column;

`;

const MenuOptionsContainer = styled.div`
    background: #363635;
    flex: 1 1 auto;

`;


const FlyOut = () => {


    return (
        <FlyOutContainer>
            <WhiteBoards />
            <MenuOptionsContainer>
                <LogoutButton />
            </MenuOptionsContainer>
        </FlyOutContainer>
    )
}

export default FlyOut;
