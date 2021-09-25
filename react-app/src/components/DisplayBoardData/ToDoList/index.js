import { useState } from "react";
import styled from "styled-components"
import useBoardType from "../../../context/Board";
import { StringEditInput } from "../../StyledComponents";
import AddToDo from "./AddToDo";

import ToDo from "./ToDo";
import TodoMenu from "./TodoMenu";

const ToDoListContainer = styled.div`
    padding: 5px;
    border: 1px solid lightgrey;
    width: fit-content;
    height: fit-content;
    max-width: 300px;
    display: flex;
    flex-direction: column;
`;

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

    const ToDosContainer = styled.div`

    `;

    const TodoNameEdit = styled(StringEditInput)`
        font-family: 'Permanent Marker', cursive;
    `;



function ToDoList({ todoList }) {
    const { setDisplayBoardData } = useBoardType()
    const [addTodo, setAddTodo] = useState(false)
    const [toggleTodoMenu, setToggleTodoMenu] = useState(false)
    const [nameEditToggle, setNameEditToggle] = useState(false)
    const [todoListName, setTodoListName] = useState(todoList.name)

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
        <ToDoListContainer>
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
                <i onClick={() => setAddTodo(prev => !prev)} className="fas fa-plus"></i>
                <i onClick={() => setToggleTodoMenu(prev => !prev)} class="fas fa-ellipsis-h"></i>
                {toggleTodoMenu && <TodoMenu setToggleTodoMenu={setToggleTodoMenu} todoList={todoList} setNameEditToggle={setNameEditToggle} />}
            </ToDoListNameContainer>
            <ToDosContainer>
                {todoList.todos.map(todo => (
                    <ToDo key={todo.id} todo={todo} todoListId={todoList.id} />
                ))}
                {addTodo && <AddToDo todoList={todoList} setAddTodo={setAddTodo} />}
            </ToDosContainer>
        </ToDoListContainer>
    )
}

export default ToDoList
