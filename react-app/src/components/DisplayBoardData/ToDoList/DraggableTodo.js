import styled from "styled-components";
import { useState } from "react";



function DraggableTodo({children}) {
    const [isDragging, setIsDragging] = useState(false)
    const [origX, setOrigX] = useState(0)
    const [origY, setOrigY] = useState(0)
    const [translateX, setTranslateX] = useState(0)
    const [translateY, setTranslateY] = useState(0)
    const [lastTranslateX, setLastTranslateX] = useState(0)
    const [lastTranslateY, setLastTranslateY] = useState(0)


    const handleMouseDown = ({ clientX, clientY }) => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        setOrigX(clientX)
        setOrigY(clientY)
        setIsDragging(true)
    }

    const handleMouseMove = (e) => {

    }

    const handleMouseUp = (e) => {


    }


    return (
        <div
            onMouseDown={handleMouseDown}
            x={translateX}
            y={translateY}
            isDragging={isDragging}
            style={{transform: `translate(${translateX}px, ${translateY}px)`}}
        >
            {children}
        </div>
    )
}

export default DraggableTodo
