
import { useState } from "react"
import useBoardsType from "../../context/Boards"
import { Button } from "../StyledComponents"

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

export default AddNewBoard
