import styled from "styled-components"


const ToDoContainer = styled.div`

`;


function ToDo({ todo }) {
    return (
        <ToDoContainer>
            {todo.content}
        </ToDoContainer>
    )
}

export default ToDo
