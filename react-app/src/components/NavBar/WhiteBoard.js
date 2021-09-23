import { useEffect, useState } from "react";
import styled from "styled-components";
import useBoardType from "../../context/Board";
import { ButtonAlt, FlyOutContainer } from "../StyledComponents";


const WhiteBoardNameContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    position: relative;
    font-size: 16px;


    .fa-ellipsis-h:hover {
        cursor: pointer;
        font-size: 20px;
    }
`;

const WhiteBoardName = styled.p`
    &:hover {
        cursor: pointer;
    }
`;


const WhiteBoardNameEdit = styled.input`
    border: none;
    background: transparent;
    color: white;
    font-size: 16px;

    &:focus {
        outline: none;
    }
`;

const BoardOptionsContainer = styled.div`
    position: absolute;
    left: 280px;
    background: #363635;
    width: fit-content;
`;


const WhiteBoard = ({ board }) => {
    const { displayBoard, setDisplayBoard } = useBoardType()
    const [optionsToggle, setOptionsToggle] = useState(false)
    const [nameEditToggle, setNameEditToggle] = useState(false)
    const [backgroundEditToggle, setBackgroundEditToggle] = useState(false)
    const [boardName, setBoardName] = useState(board.name)

    const handleChangeBoard = () => {
        setDisplayBoard(board.id)
    }

    useEffect(() => {
        if (!displayBoard) {
            setDisplayBoard(board.id)
        }
    }, [board.id, displayBoard, setDisplayBoard])


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e)
        }
    }

    const handleSubmit = (e) => {
        (async () => {
            const response = await fetch(`/api/boards/${board.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: boardName,
                    backgroundUrl: board.backgroundUrl
                })
            })
            const data = await response.json()
            if (data.errors) {
                console.log(data.errors);
            } else {
                board.name = data.board.name
                setNameEditToggle(prev => !prev)
            }
        })()
    }

    return (
        <WhiteBoardNameContainer>
            {nameEditToggle && (
                <WhiteBoardNameEdit
                    autoFocus
                    type='text'
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
                    onBlur={handleSubmit}
                    onKeyDown={handleKeyDown}
                />

            )}
            {!nameEditToggle && (
                <WhiteBoardName onClick={handleChangeBoard}>{board.name}</WhiteBoardName>
            )}
            <i onClick={() => setOptionsToggle(prev => !prev)} className="fas fa-ellipsis-h"></i>
            {optionsToggle && (
                <BoardOptionsMenu
                    setNameEditToggle={setNameEditToggle}
                    setOptionsToggle={setOptionsToggle}
                    setBackgroundEditToggle={setBackgroundEditToggle}
                />
            )}
            {backgroundEditToggle && (
                <BackgroundEditFlyout
                    board={board}
                    setOptionsToggle={setOptionsToggle}
                    setBackgroundEditToggle={setBackgroundEditToggle}
                />
            )}
        </WhiteBoardNameContainer>
    )
}


const BoardOptionsMenu = ({ setNameEditToggle, setOptionsToggle, setBackgroundEditToggle }) => {

    const handleNameEditToggle = () => {
        setNameEditToggle(prev => !prev)
        setOptionsToggle(prev => !prev)
    }

    const handleUpdateBackgroundToggle = () => {
        setBackgroundEditToggle(prev => !prev)
        setOptionsToggle(prev => !prev)
    }

    return (
        <BoardOptionsContainer>
            <ButtonAlt onClick={handleNameEditToggle}>Update Name</ButtonAlt>
            <ButtonAlt onClick={handleUpdateBackgroundToggle}>Update Background</ButtonAlt>
            <ButtonAlt>Delete</ButtonAlt>
        </BoardOptionsContainer>
    )
}

const BackgroundEditFlyout = ({ setOptionsToggle }) => {

    return (
        <FlyOutContainer>

        </FlyOutContainer>
    )
}



export default WhiteBoard;
