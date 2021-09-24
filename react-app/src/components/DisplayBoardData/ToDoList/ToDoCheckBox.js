import useBoardType from "../../../context/Board";

export default function ToDoCheckBox({ todo, todoListId }) {
    const { setDisplayBoardData } = useBoardType()

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
                        return updatedTodoList;
                    } else {
                        return todoList;
                    }
                })
                return updatedBoardItems;
            })
        })()
    }


    return (
            <i
                className={`far ${(todo.completed) ? 'fa-check-square' : 'fa-square'}`}
                onClick={handleTodoToggle}
            />
    )
}
