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


function DraggableStickyNote({ children, stickyNote }) {
    const { setDisplayBoardData } = useBoardType();
    const [dragData, setDragData] = useState({
        isDragging: false,
        orig: { xPos: 0, yPos: 0 },
        translation: {
            xPos: (window.innerWidth > stickyNote.xPos + 300) ? stickyNote.xPos : window.innerWidth - 300,
            yPos: (window.innerHeight > stickyNote.yPos + 300) ? stickyNote.yPos : window.innerHeight - 300,
        },
        lastTranslation: {
            xPos: (window.innerWidth > stickyNote.xPos + 300) ? stickyNote.xPos : window.innerWidth - 300,
            yPos: (window.innerHeight > stickyNote.yPos + 300) ? stickyNote.yPos : window.innerHeight - 300,
        },
    })

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


    const updatePlacement = () => {
        if (window.innerWidth < stickyNote.xPos + 300 || window.innerHeight < stickyNote.yPos + 300) {
            const { lastTranslation } = dragData;

            (async () => {
                const response = await fetch(`/api/sticky_notes/${stickyNote.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        content: stickyNote.content,
                        xPos: (window.innerWidth > lastTranslation.xPos + 300) ? lastTranslation.xPos : window.innerWidth - 300,
                        yPos: (window.innerHeight > lastTranslation.yPos + 300) ? lastTranslation.yPos : window.innerHeight - 300,
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
                    xPos: (window.innerWidth > lastTranslation.xPos + 300) ? lastTranslation.xPos : window.innerWidth - 300,
                    yPos: (window.innerHeight > lastTranslation.yPos + 300) ? lastTranslation.yPos : window.innerHeight - 300,
                }
            }))

            window.location.reload()
        }
    }

    let resizeEvent;
    window.onresize = () => {
        clearTimeout(resizeEvent);
        resizeEvent = setTimeout(updatePlacement, 500)
    };

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

export default DraggableStickyNote
