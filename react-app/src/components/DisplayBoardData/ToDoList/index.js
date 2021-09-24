import styled from "styled-components"


const ToDoListContainer = styled.div`
    padding: 20px;
    border: 1px solid lightgrey;
    width: 150px;
    heigth: fit-content;
`;





function ToDoList({ todoList }) {
    return (
        <ToDoListContainer>
            <h2>{todoList.name}</h2>
        </ToDoListContainer>
    )
}

export default ToDoList
