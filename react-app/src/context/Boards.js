import { createContext, useContext, useState} from "react";


export const BoardsContext = createContext();


export function BoardsProvider({ children }) {
    const [usersBoards, setUsersBoards] = useState(null);

    return (
            <BoardsContext.Provider value={{ usersBoards, setUsersBoards }}>
                {children}
            </BoardsContext.Provider>
    );
}


const useBoardsType = () => {
    return useContext(BoardsContext)
}

export default useBoardsType;
