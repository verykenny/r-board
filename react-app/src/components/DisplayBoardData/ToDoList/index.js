import { useState } from "react";
import styled from "styled-components"
import TodoListName from "./TodoListName";
import AddToDo from "./AddToDo";
import ToDo from "./ToDo";
import DraggableItem from "../DraggableItem";


const ToDoListContainer = styled.div`
    padding: 7px;
    border: 1px solid lightgrey;
    width: fit-content;
    height: fit-content;
    min-width: 250px;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    background: pink;
`;

const ToDosContainer = styled.div`

`;


function ToDoList({ todoList }) {
    const [addTodo, setAddTodo] = useState(false)
    const [nameEditToggle, setNameEditToggle] = useState(false)

    return (
        <DraggableItem element={todoList}>
            <ToDoListContainer>
                <TodoListName nameEditToggle={nameEditToggle} todoList={todoList} setNameEditToggle={setNameEditToggle} setAddTodo={setAddTodo} />
                <ToDosContainer>
                    {todoList.todos.sort((a, b) => a.id - b.id).map(todo => (
                        <ToDo key={todo.id} todo={todo} todoListId={todoList.id} />
                    ))}
                    {addTodo && <AddToDo todoList={todoList} setAddTodo={setAddTodo} />}
                </ToDosContainer>
            </ToDoListContainer>
        </DraggableItem>
    )
}

export default ToDoList
