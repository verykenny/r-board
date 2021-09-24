import styled from "styled-components"
import { useEffect, useRef } from "react";
import { Button } from "../../StyledComponents";

const TodoMenuContainer = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    background: #363635;
    color: white;
    padding: 10px;

`;

function TodoMenu({setToggleTodoMenu}) {
    const clickCheck = useRef(null)
    const ClickChecker = (ref) => {
        useEffect(() => {
            const handleCloseOptions = (e) => {
                if (ref.current && !ref.current.contains(e.target)) {
                    setToggleTodoMenu(prev => !prev)

                }
            }

            document.addEventListener("mousedown", handleCloseOptions);

            return () => {
                document.removeEventListener("mousedown", handleCloseOptions);
            };
        })
    }
    ClickChecker(clickCheck)


    return (
        <TodoMenuContainer ref={clickCheck}>
            <Button>Delete List</Button>
            <Button>Update Name</Button>
        </TodoMenuContainer>
    )
}

export default TodoMenu
