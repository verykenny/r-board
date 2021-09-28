import styled from "styled-components";

const StickyNoteContentContainer = styled.div`


`;

export default function StickyNoteContent({ stickyNote }) {
    return (
        <StickyNoteContentContainer>
            <h1>{stickyNote.content}</h1>
        </StickyNoteContentContainer>
    )
}
