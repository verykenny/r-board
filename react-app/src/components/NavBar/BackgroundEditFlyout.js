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
    justify-content: space-between;
`;

const SubmitButtonContainer = styled.div`
    width: 100%;
    height: fit-content;
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
`;


const BackgroundEditFlyout = ({ setOptionsToggle, board, setBackgroundEditToggle }) => {
    const [backgroundUrl, setBackgroundUrl] = useState(board.backgrounUrl)

    const handleUpdateBackground = () => {
        setBackgroundEditToggle(prev => !prev)
        return;
    }

    return (
        <EditFlyoutContainer>
            <BackgroundOptionsContainer>
                options
            </BackgroundOptionsContainer>

        <SubmitButtonContainer>
            <Button disabled={board.backgroundUrl === backgroundUrl} onClick={handleUpdateBackground}>Update Background</Button>
        </SubmitButtonContainer>
        </EditFlyoutContainer>
    )
}


export default BackgroundEditFlyout;
