import styled from "styled-components"
import { useEffect, useRef } from "react";
import { Button } from "../../StyledComponents";
import useBoardType from "../../../context/Board";

const StickyNoteMenuContainer = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    background: #363635;
    color: white;
    display: flex;
    flex-direction: column;
    padding: 10px 0px;
`;

const SideMenuOption = styled(Button)`
    margin: 5px;
    background: transparent;
    border: none;

    &:hover {
        color: #2D75FC;
    }
`;

const SideMenuDeleteButton = styled(SideMenuOption)`
    &:hover {
        color: #F06449;
    }
`;

function StickyNoteMenu({ setToggleStickyNoteMenu, stickyNote, setContentEditToggle }) {
    const { setDisplayBoardData } = useBoardType()

    const clickCheck = useRef(null)
    const ClickChecker = (ref) => {
        useEffect(() => {
            const handleCloseOptions = (e) => {
                if (ref.current && !ref.current.contains(e.target)) {
                    setToggleStickyNoteMenu(prev => !prev)

                }
            }

            document.addEventListener("mousedown", handleCloseOptions);

            return () => {
                document.removeEventListener("mousedown", handleCloseOptions);
            };
        })
    }
    ClickChecker(clickCheck)


    const handleDeleteStickyNote = () => {
        (async () => {
            const response = await fetch(`/api/sticky_notes/${stickyNote.id}`, { method: 'DELETE' })
            const data = await response.json()
            if (data.errors) {
                console.log(data.errors);
            } else {
                setDisplayBoardData(prev => {
                    const updatedBoardItems = { ...prev }
                    updatedBoardItems.stickyNotes = updatedBoardItems.stickyNotes.filter(listedStickyNote => listedStickyNote.id !== stickyNote.id)
                    return updatedBoardItems;
                })
            }
            setToggleStickyNoteMenu(prev => !prev)
        })()
    }

    const handleContentEditToggle = () => {
        setContentEditToggle(prev => !prev)
        setToggleStickyNoteMenu(prev => !prev)
    }

    return (
        <StickyNoteMenuContainer ref={clickCheck}>
            <SideMenuOption onClick={handleContentEditToggle}>Update Content</SideMenuOption>
            <SideMenuDeleteButton onClick={handleDeleteStickyNote}>Delete Sticky</SideMenuDeleteButton>
        </StickyNoteMenuContainer>
    )
}

export default StickyNoteMenu
