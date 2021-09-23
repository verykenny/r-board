import { useEffect, useState } from "react";
import styled from "styled-components";
import useBoardType from "../../context/Board";


const WhiteBoardNameContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    position: relative;


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

const BoardOptionsContainer = styled.div`
    position: absolute;
    left: 280px;
    background: #363635;
`;


const WhiteBoard = ({ board }) => {
    const { displayBoard, setDisplayBoard } = useBoardType()
    const [optionsToggle, setOptionsToggle] = useState(false)

    const handleChangeBoard = () => {
        setDisplayBoard(board.id)
    }

    useEffect(() => {
        if (!displayBoard) {
            setDisplayBoard(board.id)
        }
    }, [board.id, displayBoard, setDisplayBoard])

    return (
        <WhiteBoardNameContainer>
            <WhiteBoardName onClick={handleChangeBoard}>{board.name}</WhiteBoardName>
            <i onClick={() => setOptionsToggle(prev => !prev)} className="fas fa-ellipsis-h"></i>
            {optionsToggle && <BoardOptionsMenu />}
        </WhiteBoardNameContainer>
    )
}


const BoardOptionsMenu = () => {
    return (
        <BoardOptionsContainer>
            Update Name
            Update Background
            Delete
        </BoardOptionsContainer>
    )
}

export default WhiteBoard;
