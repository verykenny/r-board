import styled from 'styled-components';

export const Button = styled.button`
    background: #2D75FC;
    border: 1px solid black;
    border-radius: 225px 15px 225px 15px/15px 225px 15px 225px;
    color: white;
    padding: 7px 15px;
    min-width: 80px;
    transition: filter 300ms;

    &:hover {
        // background: #0457F1;
        filter: brightness(1.3);
    }
    `;


export const ButtonAlt = styled(Button)`
    background: #595A4A;

    &:hover {
        filter: brightness(1.3);
        // background: #434337;
    }
`;


export const FlyOutContainer = styled.div`
    height: 100vh;
    width: 300px;
    display: flex;
    flex-direction: column;
    background: #363635;
    color: white;
`;


export const StickyNote = styled.div`
    // peeled bottom
    border-bottom-right-radius: 60px 5px;
    font-family: 'Reenie Beanie', cursive;
`;




export const ToDoList = styled.div`
    font-family: 'Reenie Beanie', cursive;
    border-width: 3px 4px 3px 5px;
    border-radius:95% 4% 92% 5%/4% 95% 6% 95%;
    transform: rotate(2deg);
`;



export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 400px;
    align-items: center;
    width: 300px;
    padding: 30px;
`;


export const Form = styled.form`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 30px;
    width: 100%;
    height: 100%;
`;


export const StringInput = styled.input`
    border: none;
    border-bottom: 1px solid lightgrey;
    padding: 12px 0;
    margin: 20px 0;
    width: 100%;


    &:focus {
        outline: none;
    }
`;

export const InputsContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 100%;
`;


export const ErrorsContainer = styled.div`
    color: #F06449;
    font-weight: bold;
    text-align: center;
`;
