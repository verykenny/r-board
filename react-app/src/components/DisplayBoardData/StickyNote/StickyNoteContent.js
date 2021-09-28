import styled from "styled-components";
import { useState } from "react";
import useBoardType from "../../../context/Board";
import StickyNoteMenu from "./StickyNoteMenu";

const StickyNoteContentContainer = styled.div`
    font-family: 'Reenie Beanie', cursive;
    padding: 20px;
    font-size: 25px;
    display: flex;

    .fa-plus,
    .fa-ellipsis-h {
        color: grey;
    }

    .fa-plus:hover,
    .fa-ellipsis-h:hover {
        color: black;
        cursor: pointer;
    }
`;


const StickyNoteEdit = styled.textarea`
    font-family: 'Reenie Beanie', cursive;
    border: none;
    background: transparent;
    font-size: inherit;
    font-type: inherit;

    &:focus {
        outline: none;
    }
`;

const OptionsContainer =styled.div`
    .fa-plus {
        padding-right: 10px;
    }
`;


export default function StickyNoteContent({ stickyNote, contentEditToggle, setContentEditToggle }) {
    const [toggleStickyNoteMenu, setToggleStickyNoteMenu] = useState(false)
    const [stickyNoteContent, setStickyNoteContent] = useState(stickyNote.content)
    const { setDisplayBoardData } = useBoardType()



    const handleUpdateContent = () => {
        (async () => {
            const response = await fetch(`/api/sticky_notes/${stickyNote.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: stickyNoteContent,
                    xPos: stickyNote.xPos,
                    yPos: stickyNote.yPos,
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
            setContentEditToggle(false)
        })()
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleUpdateContent(e)
        }
    }


    return (
        <StickyNoteContentContainer>
            {contentEditToggle && (
                <StickyNoteEdit
                    autoFocus
                    type='text'
                    value={stickyNoteContent}
                    onChange={(e) => setStickyNoteContent(e.target.value)}
                    onBlur={handleUpdateContent}
                    onKeyDown={handleKeyDown}
                />
            )}
            {!contentEditToggle && stickyNote.content}
            <OptionsContainer>
                <i onClick={() => setToggleStickyNoteMenu(prev => !prev)} className="fas fa-ellipsis-h"></i>
            </OptionsContainer>
            {toggleStickyNoteMenu && <StickyNoteMenu setToggleStickyNoteMenu={setToggleStickyNoteMenu} stickyNote={stickyNote} setContentEditToggle={setContentEditToggle} />}
        </StickyNoteContentContainer>
    )
}
