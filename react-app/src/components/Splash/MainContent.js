import styled from 'styled-components';

const MainContentContainer = styled.main`
    align-items: center;
    display: flex;
    flex: 1 1 auto;
    flex-wrap: wrap;
    justify-content: space-around;
    background-image: url("https://pseudogram-bucket.s3.amazonaws.com/bg-splash-fridge.jpeg");
    background-position: center;
    background-size: cover;
    `;

    const Opacity = styled.div`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,.55);
`;

const SmallContainer = styled.section`
    border: 1px solid lightgrey;
    display: flex;
    flex-direction: column;
    height: 300px;
    justify-content: space-between;
    margin: 0px 50px;
    padding: 50px 25px;
    width: 300px;
    border-bottom-right-radius: 60px 5px;
    background: #ffff88;

    `;

const ContentHeader = styled.h2`
    font-weight: normal;
    text-align: center;
    font-family: 'Permanent Marker', cursive;
`;

const Content = styled.p`
`;


const MainContent = () => {
    return (
        <>
            <MainContentContainer>
                <Opacity>
                <SmallContainer>
                    <ContentHeader>Welcome to rBoard!</ContentHeader>
                    <Content>rBoard combines precious refrigerator space and whiteboards into one app.</Content>
                    <Content>Begin by creating a whiteboard and inviting family or roommates to keep your home organized!</Content>
                </SmallContainer>
                <SmallContainer>
                    <ContentHeader>Get Started...</ContentHeader>
                    <Content>Don't have an account yet? Create one by signing up.</Content>
                    <Content>Check out the app first by signing in as a demo user!</Content>
                </SmallContainer>
                </Opacity>
            </MainContentContainer>

        </>
    )
}


export default MainContent;
