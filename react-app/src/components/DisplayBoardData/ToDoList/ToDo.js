import styled from "styled-components"
import ToDoCheckBox from "./ToDoCheckBox";


const ToDoContainer = styled.div`
    font-size: 20px;
    display: flex;
    align-items: center;
    padding: 10px 0px;
    border-bottom: 1px solid grey
`;

const ToDoContentContainer = styled.p`
    font-family: 'Reenie Beanie', cursive;
    padding-left: 20px;
    max-width: 100%;
`;


function ToDo({ todo, todoListId }) {


    return (
        <ToDoContainer>
            <ToDoCheckBox todo={todo} todoListId={todoListId}/>
            <ToDoContentContainer>{todo.content}</ToDoContentContainer>
        </ToDoContainer>
    )
}

export default ToDo
