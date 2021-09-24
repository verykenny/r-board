import styled from "styled-components"

import ToDo from "./ToDo";

const ToDoListContainer = styled.div`
    padding: 20px;
    border: 1px solid lightgrey;
    width: 150px;
    height: fit-content;
    display: flex;
    flex-direction: column;
`;

const ToDoListNameContainer = styled.div`
    font-family: 'Permanent Marker', cursive;
    font-size: 20px;
`;

const ToDosContainer = styled.div`

`;



function ToDoList({ todoList }) {
    return (
        <ToDoListContainer>
            <ToDoListNameContainer>
                {todoList.name}
            </ToDoListNameContainer>
            <ToDosContainer>
                {todoList.todos.map(todo => (
                    <ToDo key={todo.id} todo={todo} todoListId={todoList.id}/>
                ))}
            </ToDosContainer>
        </ToDoListContainer>
    )
}

export default ToDoList
