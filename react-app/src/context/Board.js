import { createContext, useContext, useState} from "react";


export const BoardContext = createContext();


export function BoardProvider({ children }) {
    const [displayBoard, setDisplayBoard] = useState(null);
    const [displayBoardData, setDisplayBoardData] = useState(null);

    return (
            <BoardContext.Provider value={{ displayBoard, setDisplayBoard, displayBoardData, setDisplayBoardData }}>
                {children}
            </BoardContext.Provider>
    );
}


const useBoardType = () => {
    return useContext(BoardContext)
}

export default useBoardType;
