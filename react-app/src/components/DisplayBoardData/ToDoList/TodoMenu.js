import styled from "styled-components"
import { useEffect, useRef } from "react";
import { Button } from "../../StyledComponents";
import useBoardType from "../../../context/Board";

const TodoMenuContainer = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    background: #363635;
    color: white;
    display: flex;
    flex-direction: column;
    padding: 10px 0px;
`;

const SideMenuOption = styled(Button)`
    margin: 5px;
    background: transparent;
    border: none;

    &:hover {
        color: #2D75FC;
    }
`;

const SideMenuDeleteButton = styled(SideMenuOption)`
    &:hover {
        color: #F06449;
    }
`;

function TodoMenu({ setToggleTodoMenu, todoList, setNameEditToggle }) {
    const { setDisplayBoardData } = useBoardType()

    const clickCheck = useRef(null)
    const ClickChecker = (ref) => {
        useEffect(() => {
            const handleCloseOptions = (e) => {
                if (ref.current && !ref.current.contains(e.target)) {
                    setToggleTodoMenu(prev => !prev)

                }
            }

            document.addEventListener("mousedown", handleCloseOptions);

            return () => {
                document.removeEventListener("mousedown", handleCloseOptions);
            };
        })
    }
    ClickChecker(clickCheck)


    const handleDeleteList = () => {
        (async () => {
            const response = await fetch(`/api/todo_lists/${todoList.id}`, { method: 'DELETE' })
            const data = await response.json()
            if (data.errors) {
                console.log(data.errors);
            } else {
                setDisplayBoardData(prev => {
                    const updatedBoardItems = { ...prev }
                    updatedBoardItems.todoLists = updatedBoardItems.todoLists.filter(listedTodoList => listedTodoList.id !== todoList.id)
                    return updatedBoardItems;
                })
            }
            setToggleTodoMenu(prev => !prev)
        })()
    }

    const handleNameEditToggle = () => {
        setNameEditToggle(prev => !prev)
        setToggleTodoMenu(prev => !prev)
    }

    return (
        <TodoMenuContainer ref={clickCheck}>
            <SideMenuOption onClick={handleNameEditToggle}>Update Name</SideMenuOption>
            <SideMenuDeleteButton onClick={handleDeleteList}>Delete List</SideMenuDeleteButton>
        </TodoMenuContainer>
    )
}

export default TodoMenu
