import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useBoardType from "../../context/Board";
import { Button, StringEditInput } from "../StyledComponents";
import { CSSTransition } from 'react-transition-group'
import BackgroundEditFlyout from './BackgroundEditFlyout';
import useBoardsType from "../../context/Boards";
import { useSelector } from 'react-redux'
import ViewUsersFlyout from "./ViewUsersFlyout";


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
    width: 100%;
    &:hover {
        cursor: pointer;
    }
`;


const WhiteBoardNameEdit = styled(StringEditInput)`
    color: white;
    font-size: 16px;
`;

const BoardOptionsContainer = styled.div`
    position: absolute;
    left: 280px;
    top: 10px;
    z-index: 100;
    background: #363635;
    width: fit-content;
    display: flex;
    flex-direction: column;
    padding: 10px 0px;
`;

const PositionedContainer = styled.div`
    position: fixed;
    left: 300px;
    top: 0px;
    z-index: -1;
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

const WhiteBoard = ({ board }) => {
    const { displayBoard, setDisplayBoard } = useBoardType()

    const [optionsToggle, setOptionsToggle] = useState(false)
    const [nameEditToggle, setNameEditToggle] = useState(false)
    const [backgroundEditToggle, setBackgroundEditToggle] = useState(false)
    const [viewUsersToggle, setViewUsersToggle] = useState(false)
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
            {board.id === displayBoard?.id && (
                <i onClick={() => setOptionsToggle(prev => !prev)} className="fas fa-ellipsis-h"></i>
            )}


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
                    setViewUsersToggle={setViewUsersToggle}
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
                        setBackgroundEditToggle={setBackgroundEditToggle}
                    />
                </CSSTransition>
            </PositionedContainer>

            <PositionedContainer>
                <CSSTransition
                    in={viewUsersToggle}
                    timeout={300}
                    classNames='second-flyout'
                    unmountOnExit
                >
                    <ViewUsersFlyout
                        board={board}
                        setViewUsersToggle={setViewUsersToggle}
                    />
                </CSSTransition>
            </PositionedContainer>


        </WhiteBoardNameContainer>
    )
}



const BoardOptionsMenu = ({ setNameEditToggle, setOptionsToggle, setBackgroundEditToggle, board, setViewUsersToggle }) => {
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
        setOptionsToggle(prev => !prev)
        setBackgroundEditToggle(prev => !prev)
    }

    const handleViewUsersToggle = () => {
        setOptionsToggle(prev => !prev)
        setViewUsersToggle(prev => !prev)
    }


    return (
        <BoardOptionsContainer ref={clickCheck} >
            <SideMenuOption onClick={handleViewUsersToggle}>View Users</SideMenuOption>
            {board.owner && (
                <>
                    <SideMenuOption onClick={handleNameEditToggle}>Update Name</SideMenuOption>
                    <SideMenuOption onClick={handleUpdateBackgroundToggle}>Update Background</SideMenuOption>
                    <DeleteButton board={board} setOptionsToggle={setOptionsToggle} />
                </>
            )}

            {!board.owner && (
                <>
                    <LeaveButton board={board} setOptionsToggle={setOptionsToggle}></LeaveButton>
                </>
            )}
        </BoardOptionsContainer>
    )
}


const DeleteButton = ({ board, setOptionsToggle }) => {
    const [errors, setErrors] = useState(null)
    const { setDisplayBoard, setDisplayBoardData } = useBoardType()
    const { setUsersBoards } = useBoardsType()


    const handleDeleteBoard = () => {
        (async () => {
            const response = await fetch(`/api/boards/${board.id}`, { method: 'DELETE' })
            const data = await response.json()
            if (data.errors) {
                setErrors(data.errors)
                console.log(errors);
            } else {
                setDisplayBoard(null);
                setDisplayBoardData(null);
                board = null;
                setOptionsToggle(prev => !prev)
                setUsersBoards(null)
            }
        })()
    }

    return (
        <SideMenuDeleteButton onClick={handleDeleteBoard}>Delete</SideMenuDeleteButton>
    )
}

const LeaveButton = ({ board, setOptionsToggle }) => {
    const { setDisplayBoard, setDisplayBoardData } = useBoardType()
    const { setUsersBoards } = useBoardsType()
    const user = useSelector(state => state.session.user)

    const handleLeaveBoard = () => {
        (async () => {
            const response = await fetch(`/api/board_users/users/${user.id}/boards/${board.id}`, { method: 'DELETE' })
            const data = await response.json()
            if (data.errors) {
                console.log(data.errors);
            } else {
                setDisplayBoard(null);
                setDisplayBoardData(null);
                board = null;
                setOptionsToggle(prev => !prev)
                setUsersBoards(null)
            }
        })()
    }

    return(
        <SideMenuDeleteButton onClick = {handleLeaveBoard}>Leave</SideMenuDeleteButton>
    )
}



export default WhiteBoard;
