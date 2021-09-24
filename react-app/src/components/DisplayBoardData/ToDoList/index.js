import { useState } from "react";
import styled from "styled-components"
import AddToDo from "./AddToDo";

import ToDo from "./ToDo";

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

    .fa-plus {
        color: grey;
    }

    .fa-plus:hover {
        color: black;
        cursor: pointer;
    }
`;

const ToDosContainer = styled.div`

`;



function ToDoList({ todoList }) {
    const [addTodo, setAddTodo] = useState(false)


    return (
        <ToDoListContainer>
            <ToDoListNameContainer>
                {todoList.name}
                <i onClick={() => setAddTodo(prev => !prev)} className="fas fa-plus"></i>
            </ToDoListNameContainer>
            <ToDosContainer>
                {todoList.todos.map(todo => (
                    <ToDo key={todo.id} todo={todo} todoListId={todoList.id}/>
                ))}
                {addTodo && <AddToDo todoList={todoList}/>}
            </ToDosContainer>
        </ToDoListContainer>
    )
}

export default ToDoList
