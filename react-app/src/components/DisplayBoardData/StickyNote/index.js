import { useState } from "react";
import styled from "styled-components"
import StickyNoteContent from "./StickyNoteContent";
import DraggableItem from "../DraggableItem";


const StickyNoteContainer = styled.div`
    padding: 7px;
    // border: 1px solid lightgrey;
    height: 300px;
    width: 300px;

    display: flex;
    flex-direction: column;
    // background: lightblue;
    background-image: url("https://pseudogram-bucket.s3.amazonaws.com/stickynote.png");
    background-size: 114% 110%;
    background-position: center center;
`;


function StickyNote({ stickyNote }) {
    const [contentEditToggle, setContentEditToggle] = useState(false)

    return (
        <DraggableItem element={stickyNote}>
            <StickyNoteContainer>
                <StickyNoteContent contentEditToggle={contentEditToggle} stickyNote={stickyNote} setContentEditToggle={setContentEditToggle} />
            </StickyNoteContainer>
        </DraggableItem>
    )
}

export default StickyNote
