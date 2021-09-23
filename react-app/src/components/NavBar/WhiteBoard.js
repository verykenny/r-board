import { useEffect } from "react";
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


const WhiteBoard = ({ board }) => {
    const { displayBoard, setDisplayBoard } = useBoardType()

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
            <i className="fas fa-ellipsis-h"></i>
        </WhiteBoardNameContainer>
    )
}

export default WhiteBoard;
