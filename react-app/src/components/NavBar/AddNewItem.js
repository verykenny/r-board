import { Button } from "../StyledComponents"
import { CSSTransition } from 'react-transition-group'
import { FlyOutContainer } from "../StyledComponents";
import styled from "styled-components";
import { useState } from "react";


const PositionedContainer = styled.div`
    position: fixed;
    left: 300px;
    top: 0px;
    z-index: -1;
`;

const ItemFlyoutContainer = styled(FlyOutContainer)`
    width: 350px;
    padding: 40px 20px;
    padding-left: 70px;
    justify-content: space-between;
`;


const AddNewItem = () => {
    const [addItemToggle, setAddItemToggle] = useState(false)


    return (
        <>
        <Button onClick={() => setAddItemToggle(prev => !prev)}>Add New Item</Button>
        <PositionedContainer>
        <CSSTransition
            in={addItemToggle}
            timeout={300}
            classNames='second-flyout'
            unmountOnExit
        >
            <ItemOptions />
        </CSSTransition>
    </PositionedContainer>
    </>
    )
}


const ItemOptions = () => {

    return (
        <ItemFlyoutContainer>

        </ItemFlyoutContainer>
    )
}

export default AddNewItem;
