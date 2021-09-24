import styled from "styled-components"
import useBoardType from "../../../context/Board";


const ToDoContainer = styled.div`
    font-family: 'Reenie Beanie', cursive;
    font-size: 20px;
    display: flex;
`;


function ToDo({ todo, todoListId }) {
    const { setDisplayBoardData, displayBoardData } = useBoardType()

    const handleTodoToggle = () => {
        (async () => {
            const response = await fetch(`/api/todo_list_items/${todo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    completed: !todo.completed
                })
            })
            const data = await response.json()
            if (data.errors) {
                console.log(data.errors);
            }
            setDisplayBoardData(prev => {
                const updatedBoardItems = { ...prev }
                updatedBoardItems.todoLists = updatedBoardItems.todoLists.map(todoList => {
                    if (todoList.id === todoListId) {
                        const updatedTodoList = {...todoList}
                        updatedTodoList.todos = updatedTodoList.todos.map(listedTodo => {
                            if (listedTodo.id === todo.id) {
                                return data.todo;
                            } else {
                                return listedTodo;
                            }
                        })
                        return updatedTodoList
                    } else {
                        return todoList;
                    }
                })
                return updatedBoardItems
            })

        })()
    }


    return (
        <ToDoContainer>
            <i
                className={`far ${(todo.completed) ? 'fa-check-square' : 'fa-square'}`}
                onClick={handleTodoToggle}
            />
            {todo.content}
        </ToDoContainer>
    )
}

export default ToDo
