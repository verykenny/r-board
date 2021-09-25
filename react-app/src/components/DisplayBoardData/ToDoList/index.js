import { useState } from "react";
import styled from "styled-components"
import TodoListName from "./TodoListName";
import AddToDo from "./AddToDo";
import ToDo from "./ToDo";
import DraggableTodo from "./DraggableTodo";


const ToDoListContainer = styled.div`
    padding: 5px;
    border: 1px solid lightgrey;
    width: fit-content;
    height: fit-content;
    max-width: 300px;
    display: flex;
    flex-direction: column;
`;

const ToDosContainer = styled.div`

`;


function ToDoList({ todoList }) {
    const [addTodo, setAddTodo] = useState(false)
    const [nameEditToggle, setNameEditToggle] = useState(false)

    return (
        <DraggableTodo todoList={todoList}>
            <ToDoListContainer>
                <TodoListName nameEditToggle={nameEditToggle} todoList={todoList} setNameEditToggle={setNameEditToggle} setAddTodo={setAddTodo} />
                <ToDosContainer>
                    {todoList.todos.map(todo => (
                        <ToDo key={todo.id} todo={todo} todoListId={todoList.id} />
                    ))}
                    {addTodo && <AddToDo todoList={todoList} setAddTodo={setAddTodo} />}
                </ToDosContainer>
            </ToDoListContainer>
        </DraggableTodo>
    )
}

export default ToDoList
