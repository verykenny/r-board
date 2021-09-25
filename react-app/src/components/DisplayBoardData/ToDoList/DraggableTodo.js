import { useState } from "react";
import useBoardType from "../../../context/Board";
import styled from "styled-components"

const DraggableConatiner = styled.div`
    position: absolute;
    left: ${props => props.left};
    top: ${props => props.top};
`;


const DragBar = styled.div`
    height: 7px;

    &:hover {
        cursor: grab;
        background: #2D75FC;
    }
`;


function DraggableTodo({ children, todoList }) {
    const { setDisplayBoardData } = useBoardType();
    const [dragData, setDragData] = useState({
        isDragging: false,
        orig: { xPos: 0, yPos: 0 },
        translation: { xPos: todoList.xPos, yPos: todoList.yPos },
        lastTranslation: { xPos: todoList.xPos, yPos: todoList.yPos },
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


    return (
            <DraggableConatiner left={`${dragData.translation.xPos}px`} top={`${dragData.translation.yPos}px`}>
                <DragBar
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseMove}
                    onToucheStart={handleMouseDown}
                    onTouchMove={handleMouseMove}
                    onTouchEnd={handleMouseUp}
                />
                {children}
            </DraggableConatiner>
    )
}

export default DraggableTodo
