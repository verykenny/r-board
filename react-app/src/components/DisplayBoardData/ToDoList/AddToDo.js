import useBoardType from "../../../context/Board"
import styled from "styled-components"
import { useState } from "react";


const ToDoContainer = styled.div`
    font-size: 20px;
    display: flex;
    align-items: center;
    padding: 10px 0px;
    border-bottom: 1px solid grey
    `;

const ToDoContentContainer = styled.div`
    font-family: 'Reenie Beanie', cursive;
    padding-left: 20px;
    `;

const ToDoEdit = styled.input`
    font-size: 20px;
    padding-left: 20px;
    font-family: 'Reenie Beanie', cursive;
    border: none;
    background: transparent;

    &:focus {
        outline: none;
    }
`;

function AddToDo({ todoList, setAddTodo }) {
    const { setDisplayBoardData } = useBoardType()
    const [todoContent, setTodoContent] = useState('')

    const handleAddTodo = () => {
        (async () => {
            const response = await fetch(`/api/todo_lists/${todoList.id}/todo_list_items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    completed: false,
                    content: todoContent,
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
                        listedTodoList.todos.push(data.todo)
                    }
                    return listedTodoList;
                })
                return updatedBoardItems;
            })
            setAddTodo(false)
        })()
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddTodo(e)
        }
    }

    return (
        <ToDoContainer>
            <i className='far fa-square' />
            <ToDoEdit
                autoFocus
                type='text'
                value={todoContent}
                onChange={(e) => setTodoContent(e.target.value)}
                onBlur={handleAddTodo}
                onKeyDown={handleKeyDown}
            />
            <ToDoContentContainer></ToDoContentContainer>
        </ToDoContainer>
    )
}

export default AddToDo
