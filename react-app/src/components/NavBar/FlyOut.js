import styled from 'styled-components';
import LogoutButton from '../auth/LogoutButton';


const FlyOutContainer = styled.div`
    height: 100vh;
    width: 300px;
    display: flex;
    flex-direction: column;

`;

const WhiteBoardsContainer = styled.div`
    background: #D8E2DC;
    width: 100%;
    height: 600px;
    max-height: 65%;
`;

const MenuOptionsContainer = styled.div`
    background: #363635;
    flex: 1 1 auto;

`;


const FlyOut = () => {


    return (
        <FlyOutContainer>
            <WhiteBoardsContainer>

            </WhiteBoardsContainer>
            <MenuOptionsContainer>
                foyout
                <LogoutButton />
            </MenuOptionsContainer>
        </FlyOutContainer>
    )
}

export default FlyOut;
