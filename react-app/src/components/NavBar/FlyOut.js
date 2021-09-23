import styled from 'styled-components';
import LogoutButton from '../auth/LogoutButton';
import WhiteBoards from './WhiteBoards';
import { Button, FlyOutContainer } from '../StyledComponents'
import { useState } from 'react';
import './FlyOut.css'
import useBoardsType from '../../context/Boards';



const MenuOptionsContainer = styled.div`
    background: #363635;
    flex: 1 1 auto;

`;


const FlyOut = ({ showFlyOut }) => {
    return (
        <FlyOutContainer>
            <WhiteBoards />
            <MenuOptionsContainer>
                <LogoutButton />
                <AddNewBoard />
            </MenuOptionsContainer>
        </FlyOutContainer>
    )
}



const AddNewBoard = () => {
    const [errors, setErrors] = useState(null)
    const { setUsersBoards } = useBoardsType()


    const handleCreateBoard = () => {
        (async () => {
            const response = await fetch('/api/boards/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: 'Home',
                    backgroundUrl: 'https://pseudogram-bucket.s3.amazonaws.com/bg-whiteboard.png'
                })
            })
            const data = await response.json()
            if (data.errors) {
                setErrors(data.errors)
                console.log(errors);
            } else {
                setUsersBoards(prev => [...prev, data.board])
            }

        })()
    }

    return (
        <Button onClick={handleCreateBoard}>Add New Board</Button>
    )
}

export default FlyOut;
