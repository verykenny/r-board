import { useState } from "react";
import styled from "styled-components";
import { Button, FlyOutContainer } from "../StyledComponents";



const EditFlyoutContainer = styled(FlyOutContainer)`
    width: 350px;
    padding: 40px 20px;
    padding-left: 70px;
    justify-content: space-between;
`;

const BackgroundOptionsContainer = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const SubmitButtonContainer = styled.div`
    width: 100%;
    height: fit-content;
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
`;

const ImageBackgroundContainer = styled.div`
    margin: 15px 0;
`;

const ImageBackground = styled.div.attrs(props => ({
    boxShadow: (props.active) ? "box-shadow: -8px 11px 10px;" : "-2px 5px 5px;"
}))`
    width: 250px;
    height: 150px;
    background-image: url(${props => props.backgroundUrl});
    background-size: 250px 150px;
    color: black;
    transition: box-shadow 300ms;

    &:hover {
        box-shadow: -8px 11px 10px;
    }
`;


const BackgroundEditFlyout = ({ setOptionsToggle, board, setBackgroundEditToggle }) => {
    const [backgroundUrl, setBackgroundUrl] = useState(board.backgroundUrl);

    const handleUpdateBackground = () => {
        setBackgroundEditToggle(prev => !prev)
        return;
    }

    console.log(backgroundUrl);
    
    return (
        <EditFlyoutContainer>
            <BackgroundOptionsContainer>
                <ImageBackgroundContainer>
                    <ImageBackground
                        active={backgroundUrl === 'https://pseudogram-bucket.s3.amazonaws.com/bg-whiteboard.png'}
                        backgroundUrl={'https://pseudogram-bucket.s3.amazonaws.com/bg-whiteboard.png'}
                        />
                </ImageBackgroundContainer>
                <ImageBackgroundContainer>
                    <ImageBackground
                        active={backgroundUrl === 'https://pseudogram-bucket.s3.amazonaws.com/bg-blackboard2.jpeg'}
                        backgroundUrl={'https://pseudogram-bucket.s3.amazonaws.com/bg-blackboard2.jpeg'}
                    />
                </ImageBackgroundContainer>
            </BackgroundOptionsContainer>

            <SubmitButtonContainer>
                <Button disabled={board.backgroundUrl === backgroundUrl} onClick={handleUpdateBackground}>Update Background</Button>
            </SubmitButtonContainer>
        </EditFlyoutContainer>
    )
}

export default BackgroundEditFlyout;
