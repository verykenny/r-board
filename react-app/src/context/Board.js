import { createContext, useContext, useState} from "react";


export const BoardContext = createContext();


export function BoardProvider({ children }) {
    const [displayBoard, setDisplayBoard] = useState(null);

    return (
            <BoardContext.Provider value={{ displayBoard, setDisplayBoard }}>
                {children}
            </BoardContext.Provider>
    );
}


const useBoardType = () => {
    return useContext(BoardContext)
}

export default useBoardType;
