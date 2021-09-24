import styled from "styled-components"
import useBoardType from "../../../context/Board";
import ToDoCheckBox from "./ToDoCheckBox";


const ToDoContainer = styled.div`
    font-family: 'Reenie Beanie', cursive;
    font-size: 20px;
    display: flex;
`;


function ToDo({ todo, todoListId }) {
    const { setDisplayBoardData } = useBoardType()



    return (
        <ToDoContainer>
            <ToDoCheckBox todo={todo} todoListId={todoListId}/>
            {todo.content}
        </ToDoContainer>
    )
}

export default ToDo
