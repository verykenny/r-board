
import { useState } from "react"
import useBoardType from "../../context/Board"
import useBoardsType from "../../context/Boards"
import { Button } from "../StyledComponents"

const AddNewBoard = () => {
    const [errors, setErrors] = useState(null)
    const { setUsersBoards } = useBoardsType()
    const { setDisplayBoard } = useBoardType()


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
                data.board.owner = true
                setUsersBoards(prev => [...prev, data.board])
                setDisplayBoard(data.board)
            }

        })()
    }

    return (
        <Button onClick={handleCreateBoard}>Add New Board</Button>
    )
}

export default AddNewBoard
