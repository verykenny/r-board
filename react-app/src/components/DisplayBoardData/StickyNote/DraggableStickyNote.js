import { useState } from "react";
import useBoardType from "../../../context/Board";
import styled from "styled-components"

const DraggableConatiner = styled.div`
    padding: 50px 0 0 0;
    position: absolute;
    left: ${props => props.left};
    top: ${props => props.top};
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


function DraggableStickyNote({ children, stickyNote }) {
    const { setDisplayBoardData } = useBoardType();
    const [dragData, setDragData] = useState({
        isDragging: false,
        orig: { xPos: 0, yPos: 0 },
        translation: { xPos: stickyNote.xPos, yPos: stickyNote.yPos },
        lastTranslation: { xPos: stickyNote.xPos, yPos: stickyNote.yPos },
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
                const response = await fetch(`/api/sticky_notes/${stickyNote.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        content: stickyNote.content,
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
                    updatedBoardItems.stickyNotes = updatedBoardItems.stickyNotes.map(listedStickyNote => {
                        if (listedStickyNote.id === stickyNote.id) {
                            return data.stickyNote
                        }
                        return listedStickyNote;
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
            left={`${dragData.translation.xPos}px`}
            top={`${dragData.translation.yPos}px`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
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

export default DraggableStickyNote
