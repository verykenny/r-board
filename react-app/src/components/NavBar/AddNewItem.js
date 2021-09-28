import { Button } from "../StyledComponents"
import { CSSTransition } from 'react-transition-group'
import { FlyOutContainer } from "../StyledComponents";
import styled from "styled-components";
import { useState } from "react";
import useBoardType from "../../context/Board";


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
`;

const AddItemButton = styled(Button)`
    margin-bottom: 15px;
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
                    <ItemOptions setAddItemToggle={setAddItemToggle} />
                </CSSTransition>
            </PositionedContainer>
        </>
    )
}


const ItemOptions = ({ setAddItemToggle }) => {
    const { displayBoard, setDisplayBoardData } = useBoardType()

    const handleCreateTodoList = () => {
        (async () => {
            const response = await fetch(`/api/boards/${displayBoard.id}/todo_lists`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: 'New List',
                    xPos: window.innerWidth / 2,
                    yPos: window.innerHeight / 2,
                })
            })
            const data = await response.json()
            if (data.errors) {
                console.log(data.errors);
            } else {
                setAddItemToggle(false)
                setDisplayBoardData(prev => {
                    const newBoardData = { ...prev }
                    newBoardData.todoLists.push(data.todoList)
                    return newBoardData;
                })
            }
        })()
    }

    const handleCreateStickyNote = () => {
        (async () => {
            const response = await fetch(`/api/boards/${displayBoard.id}/sticky_notes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: 'Sure to be one of your best!',
                    xPos: window.innerWidth / 2,
                    yPos: window.innerHeight / 2,
                })
            })
            const data = await response.json()
            if (data.errors) {
                console.log(data.errors);
            } else {
                setAddItemToggle(false)
                setDisplayBoardData(prev => {
                    const newBoardData = { ...prev }
                    newBoardData.stickyNotes.push(data.stickyNote)
                    return newBoardData;
                })
            }
        })()
    }


    return (
        <ItemFlyoutContainer>
            <AddItemButton onClick={handleCreateTodoList}>New Todo List</AddItemButton>
            <AddItemButton onClick={handleCreateStickyNote}>New Sticky Note</AddItemButton>
        </ItemFlyoutContainer>
    )
}

export default AddNewItem;
