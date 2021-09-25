import { useState, useRef } from "react";


// need to use a class component because we need the updated state immediately and functional components won't let you use the updated values immediately
// useRef won't work because it doesn't notify anything of a change and doesn't cause a re-render
function DraggableTodo({ children }) {
    const [dragData, setDragData] = useState({
        isDragging: false,
        orig: { xPos: 0, yPos: 0 },
        translation: { xPos: 0, yPos: 0 },
        lastTranslation: { xPos: 0, yPos: 0 },
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
            style={{ position: 'absolute', left: `${dragData.translation.xPos}px`, top: `${dragData.translation.yPos}px`, cursor: 'grab', background: 'pink' }}
        >
        {children}
        </div>
    </>
    )
}

export default DraggableTodo
