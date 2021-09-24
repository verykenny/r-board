import useBoardType from "../../../context/Board"
import { StringInput } from "../../StyledComponents"
import styled from "styled-components"
import ToDoCheckBox from "./ToDoCheckBox";


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

function AddToDo({ todoList }) {
    const { setDisplayBoardData } = useBoardType()

    const handleAddTodo = () => {
        (async () => {
            const response = await fetch(`/api/todo_lists/${todoList.id}/todo_list_items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    completed: false,
                    content: '',
                })
            })
            const data = await response.json()
            if (data.errors) {
                console.log(data.errors);
            }
            setDisplayBoardData(prev => prev)
        })()
    }

    return (
        <ToDoContainer>
            <i className='far fa-square' onClick={handleAddTodo} />
            <ToDoContentContainer></ToDoContentContainer>
        </ToDoContainer>
    )
}

export default AddToDo
