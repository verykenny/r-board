import styled from 'styled-components';

const MainContentContainer = styled.main`
    align-items: center;
    display: flex;
    flex: 1 1 auto;
    flex-wrap: wrap;
    justify-content: space-around;
    background-image: url('/bg-splash-fridge.jpeg');
    background-position: center;
    background-size: cover;
`;

const SmallContainer = styled.section`
    border: 1px solid lightgrey;
    display: flex;
    flex-direction: column;
    height: 40%;
    justify-content: space-between;
    margin: 0px 50px;
    max-height: 300px;
    padding: 50px 25px;
    width: 300px;
    background: white;
`;

const ContentHeader = styled.h2`
    font-weight: normal;
    text-align: center;
`;

const Content = styled.p`
`;


const MainContent = () => {
    return (
        <>
            <MainContentContainer>
                <SmallContainer>
                    <ContentHeader>Welcome to rBoard!</ContentHeader>
                    <Content>rBoard meant to combine precious refrigerator space and whiteboards into one app.</Content>
                    <Content>Begin by creating a whiteboard and inviting family or roommates to keep your home organized!</Content>
                </SmallContainer>
                <SmallContainer>
                    <ContentHeader>Get Started...</ContentHeader>
                    <Content>Don't have an account yet? Create one by signing up.</Content>
                    <Content>Check out the app first by signing in as a demo user!</Content>
                </SmallContainer>
            </MainContentContainer>

        </>
    )
}


export default MainContent;
