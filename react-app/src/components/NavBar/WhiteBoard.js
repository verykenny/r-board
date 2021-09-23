import { useEffect, useState } from "react";
import styled from "styled-components";
import useBoardType from "../../context/Board";


const WhiteBoardNameContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;


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
            <BoardOptionsMenu />
        </WhiteBoardNameContainer>
    )
}


const BoardOptionsMenu = () => {
    return (
        <BoardOptionsContainer></BoardOptionsContainer>
    )
}

export default WhiteBoard;
