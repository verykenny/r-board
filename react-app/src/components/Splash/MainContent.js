import styled from 'styled-components';

export const MainContentContainer = styled.main`
    align-items: center;
    display: flex;
    flex: 1 1 auto;
    justify-content: space-around;
`;

export const SmallContainer = styled.section`
    border: 1px solid grey;
    margin: 20px 50px;
    padding: 20px;
    width: 300px;
`;

const MainContent = () => {
    return (
        <>
            <MainContentContainer>
                <SmallContainer>About App</SmallContainer>
                <SmallContainer>Sign up log in</SmallContainer>
            </MainContentContainer>

        </>
    )
}


export default MainContent;
