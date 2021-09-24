import useBoardType from "../../context/Board"
import ToDoList from "./ToDoList"



function DisplayBoardData() {
    const { displayBoardData } = useBoardType()
    return (
        <>
            {displayBoardData.todoLists.map(todoList => (
                <ToDoList key={todoList.id} todoList={todoList}/>
            ))}
        </>
    )
}

export default DisplayBoardData
