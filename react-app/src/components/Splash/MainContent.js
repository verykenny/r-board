import styled from 'styled-components';

export const MainContentContainer = styled.main`
    align-items: center;
    display: flex;
    flex: 1 1 auto;
    flex-wrap: wrap;
    justify-content: space-around;
    background-image: url('/bg-splash-fridge.jpeg');
    background-position: center;
    background-size: cover;
`;

export const SmallContainer = styled.section`
    border: 1px solid lightgrey;
    display: flex;
    flex-direction: column;
    height: 40%;
    margin: 0px 50px;
    padding: 20px;
    width: 300px;
    background: white;
`;

const MainContent = () => {
    return (
        <>
            <MainContentContainer>
                <SmallContainer>
                    <h2>Welcome to rBoard!</h2>
                    <p>rBoard meant to combine precious refrigerator space and whiteboards into one app.</p>
                    <p>Begin by creating a whiteboard and inviting family or roommates to keep your home organized!</p>
                </SmallContainer>
                <SmallContainer>
                    <h2>Get Started!</h2>
                    <p>Don't have an account yet? Create one by signing up.</p>
                    <p>Check out the app first by signing in as a demo user!</p>
                </SmallContainer>
            </MainContentContainer>

        </>
    )
}


export default MainContent;
