import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useBoardType from "../../context/Board";
import { ButtonAlt } from "../StyledComponents";
import { CSSTransition } from 'react-transition-group'
import BackgroundEditFlyout from './BackgroundEditFlyout';
import useBoardsType from "../../context/Boards";


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
    top: 10px;
    z-index: 100;
    background: #363635;
    width: fit-content;
`;

const PositionedContainer = styled.div`
    position: fixed;
    left: 300px;
    top: 0px;
    z-index: -1;
`;



const WhiteBoard = ({ board }) => {
    const { setDisplayBoard } = useBoardType()

    const [optionsToggle, setOptionsToggle] = useState(false)
    const [nameEditToggle, setNameEditToggle] = useState(false)
    const [backgroundEditToggle, setBackgroundEditToggle] = useState(false)
    const [boardName, setBoardName] = useState(board.name)

    const handleChangeBoard = () => {
        setDisplayBoard(board)
    }


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
                setDisplayBoard(board)
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


            <CSSTransition
                in={optionsToggle}
                timeout={300}
                classNames='options-menu'
                unmountOnExit
            >
                <BoardOptionsMenu
                    setNameEditToggle={setNameEditToggle}
                    setOptionsToggle={setOptionsToggle}
                    setBackgroundEditToggle={setBackgroundEditToggle}
                    board={board}
                />
            </CSSTransition>

            <PositionedContainer>
                <CSSTransition
                    in={backgroundEditToggle}
                    timeout={300}
                    classNames='second-flyout'
                    unmountOnExit
                >
                    <BackgroundEditFlyout
                        board={board}
                        setOptionsToggle={setOptionsToggle}
                        setBackgroundEditToggle={setBackgroundEditToggle}
                    />
                </CSSTransition>
            </PositionedContainer>


        </WhiteBoardNameContainer>
    )
}



const BoardOptionsMenu = ({ setNameEditToggle, setOptionsToggle, setBackgroundEditToggle, board }) => {
    const clickCheck = useRef(null)
    const ClickChecker = (ref) => {
        useEffect(() => {
            const handleCloseOptions = (e) => {
                if (ref.current && !ref.current.contains(e.target)) {
                    setOptionsToggle(prev => !prev)

                }
            }

            document.addEventListener("mousedown", handleCloseOptions);

            return () => {
                document.removeEventListener("mousedown", handleCloseOptions);
            };
        })
    }
    ClickChecker(clickCheck)

    const handleNameEditToggle = () => {
        setNameEditToggle(prev => !prev)
        setOptionsToggle(prev => !prev)
    }

    const handleUpdateBackgroundToggle = () => {
        console.log('HELLO!')
        setOptionsToggle(prev => !prev)
        setBackgroundEditToggle(prev => !prev)
    }

    return (
        <BoardOptionsContainer ref={clickCheck} >
            <ButtonAlt onClick={handleNameEditToggle}>Update Name</ButtonAlt>
            <ButtonAlt onClick={handleUpdateBackgroundToggle}>Update Background</ButtonAlt>
            <DeleteButton board={board} setOptionsToggle={setOptionsToggle} />
        </BoardOptionsContainer>
    )
}


const DeleteButton = ({ board, setOptionsToggle }) => {
    const [errors, setErrors] = useState(null)
    const { setDisplayBoard } = useBoardType()
    const { setUsersBoards } = useBoardsType()


    const handleDeleteBoard = () => {
        (async () => {
            const response = await fetch(`/api/boards/${board.id}`, { method: 'DELETE'})
            const data = await response.json()
            if (data.errors) {
                setErrors(data.errors)
                console.log(errors);
            } else {
                setDisplayBoard(null);
                board = null;
                setOptionsToggle(prev => !prev)
                setUsersBoards(null)
            }
        })()
    }

    return (
        <ButtonAlt onClick={handleDeleteBoard}>Delete</ButtonAlt>
    )
}



export default WhiteBoard;
