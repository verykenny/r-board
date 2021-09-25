import { useState, useRef } from "react";
import useBoardType from "../../../context/Board";


// need to use a class component because we need the updated state immediately and functional components won't let you use the updated values immediately
// useRef won't work because it doesn't notify anything of a change and doesn't cause a re-render
function DraggableTodo({ children, todoList }) {
    const { setDisplayBoardData } = useBoardType();
    const [dragData, setDragData] = useState({
        isDragging: false,
        orig: { xPos: 0, yPos: 0 },
        translation: { xPos: todoList.xPos , yPos: todoList.yPos },
        lastTranslation: { xPos: todoList.xPos , yPos: todoList.yPos },
    })

    const handleMouseDown = ({ clientX, clientY }) => {
        if (!dragData.isDragging) {
            setDragData(prev => ({
                ...prev,
                isDragging: true,
                orig: { xPos: clientX, yPos: clientY }
            }))
        }
    }

    const handleMouseMove = ({ clientX, clientY }) => {
        if (dragData.isDragging) {
            const { orig, lastTranslation } = dragData
            setDragData(prev => ({
                ...prev,
                translation: {
                    xPos: clientX - orig.xPos + lastTranslation.xPos,
                    yPos: clientY - orig.yPos + lastTranslation.yPos,
                }
            }))
        }

    }

    const handleMouseUp = (e) => {
        if (dragData.isDragging) {
            const { translation } = dragData;


            (async () => {
                const response = await fetch(`/api/todo_lists/${todoList.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: todoList.name,
                        xPos: translation.xPos,
                        yPos: translation.yPos,
                    })
                })
                const data = await response.json()
                if (data.errors) {
                    console.log(data.errors);
                }
                setDisplayBoardData(prev => {
                    const updatedBoardItems = { ...prev }
                    updatedBoardItems.todoLists = updatedBoardItems.todoLists.map(listedTodoList => {
                        if (listedTodoList.id === todoList.id) {
                            return data.todoList
                        }
                        return listedTodoList;
                    })
                    return updatedBoardItems;
                })
            })()


            setDragData(prev => ({
                ...prev,
                isDragging: false,
                lastTranslation: {
                    xPos: translation.xPos,
                    yPos: translation.yPos,
                }
            }))
        }
    }


    return (<>
        <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onToucheStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
            style={{ position: 'absolute', left: `${dragData.translation.xPos}px`, top: `${dragData.translation.yPos}px`, cursor: 'grab', background: 'pink' }}
        >
        {children}
        </div>
    </>
    )
}

export default DraggableTodo
