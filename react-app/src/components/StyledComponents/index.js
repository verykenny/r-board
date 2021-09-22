import styled from 'styled-components';

export const Button = styled.button`
    background: #2D75FC;
    border: 2px solid black;
    border-radius: 225px 15px 225px 15px/15px 225px 15px 225px;
    color: white;
    padding: 5px;
    width: 80px;

    &:hover {
        background: #0457F1;
    }
`;


export const ButtonAlt = styled(Button)`
    background: #595A4A;

    &:hover {
        background: #434337;
    }
`;


const StickyNote = styled.div`
    // peeled bottom
    border-bottom-right-radius: 60px 5px;
    font-family: 'Reenie Beanie', cursive;
`;


const ToDoList = stuled.div`
    font-family: 'Reenie Beanie', cursive;
`;
