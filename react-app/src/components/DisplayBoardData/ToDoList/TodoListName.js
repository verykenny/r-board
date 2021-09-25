import { useState } from "react";
import useBoardType from "../../../context/Board";
import styled from "styled-components";
import { StringEditInput } from "../../StyledComponents";
import TodoMenu from "./TodoMenu";


const ToDoListNameContainer = styled.div`
    font-family: 'Permanent Marker', cursive;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3px;
    position: relative;

    .fa-plus,
    .fa-ellipsis-h {
        color: grey;
    }

    .fa-plus:hover,
    .fa-ellipsis-h:hover {
        color: black;
        cursor: pointer;
    }
`;

const TodoNameEdit = styled(StringEditInput)`
    font-family: 'Permanent Marker', cursive;
`;

const OptionsContainer =styled.div`
    .fa-plus {
        padding-right: 10px;
    }
`;


function TodoListName({ nameEditToggle, todoList, setNameEditToggle, setAddTodo }) {
    const [toggleTodoMenu, setToggleTodoMenu] = useState(false)
    const [todoListName, setTodoListName] = useState(todoList.name)
    const { setDisplayBoardData } = useBoardType()

    const handleUpdateName = () => {
        (async () => {
            const response = await fetch(`/api/todo_lists/${todoList.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: todoListName,
                    xPos: todoList.xPos,
                    yPos: todoList.yPos,
                })
            })
            const data = await response.json()
            if (data.errors) {
                console.log(data.errors);
            }
            setDisplayBoardData(prev => {
                const updatedBoardItems = { ...prev }
                updatedBoardItems.todoLists = updatedBoardItems.todoLists.map(listedTodoList => {
                    if (listedTodoList.id === todoList.id) {
                        return data.todoList
                    }
                    return listedTodoList;
                })
                return updatedBoardItems;
            })
            setNameEditToggle(false)
        })()
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleUpdateName(e)
        }
    }

    return (
        <ToDoListNameContainer>
            {nameEditToggle && (
                < TodoNameEdit
                    autoFocus
                    type='text'
                    value={todoListName}
                    onChange={(e) => setTodoListName(e.target.value)}
                    onBlur={handleUpdateName}
                    onKeyDown={handleKeyDown}
                />
            )}
            {!nameEditToggle && todoList.name}
            <OptionsContainer>
                <i onClick={() => setAddTodo(prev => !prev)} className="fas fa-plus"></i>
                <i onClick={() => setToggleTodoMenu(prev => !prev)} class="fas fa-ellipsis-h"></i>
            </OptionsContainer>
            {toggleTodoMenu && <TodoMenu setToggleTodoMenu={setToggleTodoMenu} todoList={todoList} setNameEditToggle={setNameEditToggle} />}
        </ToDoListNameContainer>
    )
}

export default TodoListName;
