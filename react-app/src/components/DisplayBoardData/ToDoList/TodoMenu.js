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
    padding: 10px;

`;

function TodoMenu({ setToggleTodoMenu, todoList }) {
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


    return (
        <TodoMenuContainer ref={clickCheck}>
            <Button onClick={handleDeleteList}>Delete List</Button>
            <Button>Update Name</Button>
        </TodoMenuContainer>
    )
}

export default TodoMenu
