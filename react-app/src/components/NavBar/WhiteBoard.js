import styled from "styled-components";


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

    const handleChangeBoard = () => {
        alert('whatNow?')
    }



    return (
        <WhiteBoardNameContainer>
            <WhiteBoardName onClick={handleChangeBoard}>{board.name}</WhiteBoardName>
            <i className="fas fa-ellipsis-h"></i>
        </WhiteBoardNameContainer>
    )
}

export default WhiteBoard;
