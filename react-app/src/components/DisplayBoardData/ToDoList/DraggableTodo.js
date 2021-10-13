import { useState } from "react";
import useBoardType from "../../../context/Board";
import styled from "styled-components"

const DraggableConatiner = styled.div`
    // padding: 50px 0 0 0;
    position: absolute;
    left: ${props => props.left};
    top: ${props => props.top};
    z-index: ${props => (props.dragging) ? '5' : '1'}
`;

const ChildrenContainer = styled.div`
    transition: box-shadow 0.3s;
    // box-shadow: 2px 2px 2px;

    box-shadow: ${props => (props.dragging) ? '-2px 6px 6px' : '0px 2px 2px'}
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
        translation: {
            xPos: (window.innerWidth * (todoList.xPos / 100)),
            yPos: (window.innerHeight * (todoList.yPos / 100)),
        },
        lastTranslation: {
            xPos: (window.innerWidth * (todoList.xPos / 100)),
            yPos: (window.innerHeight * (todoList.yPos / 100)),
        },
        // translation: {
        //     xPos: (window.innerWidth > todoList.xPos + 300) ? todoList.xPos : window.innerWidth - 300,
        //     yPos: (window.innerHeight > todoList.yPos + 300) ? todoList.yPos : window.innerHeight - 300,
        // },
        // lastTranslation: {
        //     xPos: (window.innerWidth > todoList.xPos + 300) ? todoList.xPos : window.innerWidth - 300,
        //     yPos: (window.innerHeight > todoList.yPos + 300) ? todoList.yPos : window.innerHeight - 300,
        // },
    })

    console.log(dragData.translation.xPos);

    const handleMouseDown = (e) => {
        if (!dragData.isDragging) {
            setDragData(prev => ({
                ...prev,
                isDragging: true,
                orig: { xPos: e.clientX, yPos: e.clientY }
            }))
        }
    }

    const handleMouseMove = (e) => {
        if (e.preventDefault) e.preventDefault()
        if (e.stopPropagation) e.stopPropagation()

        if (dragData.isDragging) {
            const { orig, lastTranslation } = dragData
            setDragData(prev => ({
                ...prev,
                translation: {
                    xPos: e.clientX - orig.xPos + lastTranslation.xPos,
                    yPos: e.clientY - orig.yPos + lastTranslation.yPos,
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
                        xPos: Math.floor((translation.xPos / window.innerWidth) * 100),
                        yPos: Math.floor((translation.yPos / window.innerHeight) * 100),
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
        <DraggableConatiner
            dragging={dragData.isDragging}
            left={`${dragData.translation.xPos}px`}
            top={`${dragData.translation.yPos}px`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}>

            <DragBar
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
                onTouchMove={handleMouseMove}
                onTouchEnd={handleMouseUp}
            />
            <ChildrenContainer dragging={dragData.isDragging}>
                {children}
            </ChildrenContainer>
        </DraggableConatiner>
    )
}

export default DraggableTodo
