import useBoardType from "../../context/Board"
import StickyNote from "./StickyNote"
import ToDoList from "./ToDoList"



function DisplayBoardData() {
    const { displayBoardData } = useBoardType()
    return (
        <>
            {displayBoardData.todoLists.map(todoList => (
                <ToDoList key={todoList.id} todoList={todoList}/>
            ))}
            {displayBoardData.stickyNotes.map(stickyNote => (
                <StickyNote key={stickyNote.id} stickyNote={stickyNote}/>
            ))}
        </>
    )
}

export default DisplayBoardData
