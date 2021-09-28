import { useState } from "react";
import styled from "styled-components"
import StickyNoteContent from "./StickyNoteContent";
import DraggableStickyNote from "./DraggableStickyNote";


const StickyNoteContainer = styled.div`
    padding: 7px;
    border: 1px solid lightgrey;
    width: fit-content;
    height: fit-content;
    min-width: 250px;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    background: pink;
`;


function StickyNote({ stickyNote }) {
    const [contentEditToggle, setContentEditToggle] = useState(false)

    return (
        <DraggableStickyNote stickyNote={stickyNote}>
            <StickyNoteContainer>
                <StickyNoteContent contentEditToggle={contentEditToggle} stickyNote={stickyNote} setContentEditToggle={setContentEditToggle} />

            </StickyNoteContainer>
        </DraggableStickyNote>
    )
}

export default StickyNote
