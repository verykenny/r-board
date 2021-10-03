import styled from "styled-components"
import { Button, FlyOutContainer } from "../StyledComponents";
import { CSSTransition } from 'react-transition-group'
import { useState, useEffect, useRef } from "react";
import useDebounce from "../hooks/useDebounce";
import { useSelector } from 'react-redux'


const UserSearchFlyoutContainer = styled(FlyOutContainer)`
    width: 350px;
    padding: 40px 20px;
    padding-left: 70px;
`;

const PositionedContainer = styled.div`
    position: fixed;
    left: 300px;
    top: 0px;
    z-index: -1;
`;

const SearchBar = styled.input`

`;

const UserResultsContainer = styled.div`

`;

const UserContainer = styled.div`
    cursor: pointer;

    background-color: ${props => (props.active) ? 'blue' : 'none'};
`;

const UserBoardsContainer = styled.div`

`;
const BoardContainer = styled.div`

`;


function UserSearchFlyout() {
    const [userSearchToggle, setUserSearchToggle] = useState('')

    return (
        <>
            <Button onClick={() => setUserSearchToggle(prev => !prev)}>User Search</Button>
            <PositionedContainer>
                <CSSTransition
                    in={userSearchToggle}
                    timeout={300}
                    classNames='second-flyout'
                    unmountOnExit
                >
                    <UserSearch setUserSearchToggle={setUserSearchToggle} />
                </CSSTransition>
            </PositionedContainer>
        </>
    )
}


function UserSearch({setUserSearchToggle}) {
    const user = useSelector(state => state.session.user);
    const [users, setUsers] = useState([])
    const [filteredSearch, setFilteredSearch] = useState([])
    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search, 250);
    const [boards, setBoards] = useState([])
    const [activeUserId, setActiveUserId] = useState(null)

    const clickCheck = useRef(null)
    const ClickChecker = (ref) => {
        useEffect(() => {
            const handleCloseOptions = (e) => {
                if (ref.current && !ref.current.contains(e.target)) {
                    setUserSearchToggle(false)

                }
            }
            document.addEventListener("mousedown", handleCloseOptions);
            return () => {
                document.removeEventListener("mousedown", handleCloseOptions);
            };
        })
    }
    ClickChecker(clickCheck)

    useEffect(() => {
        const searchUsers = (search, id) => {
            let lowerSearch = search.toLowerCase()
            const filteredUsers = users.filter(user => {
                return user.username.toLowerCase().startsWith(lowerSearch) && user.id !== id
            })
            if (search !== '') setFilteredSearch(filteredUsers)
            else setFilteredSearch([])
        }

        if (!user) return;
        searchUsers(search, user.id)
    }, [debouncedSearch, search, users, user])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, []);


    useEffect(() => {
        const handleGetBoards = (activeUserId) => {
            (async () => {
                    const response = await fetch(`/api/users/${activeUserId}/boards`)
                    const data = await response.json()
                    if (data.errors) {
                        console.log(data.errors);
                    } else {
                        setBoards(data.boards.filter(board => board.owner))
                    }
            })()
        }
        handleGetBoards(activeUserId)

    }, [activeUserId])


    const handleGetSessionUserBoards = () => {
        (async () => {
            const response = await fetch(`/api/users/${user.id}/boards`)
            const data = await response.json()
            if (data.errors) {
                console.log(data.errors);
            } else {
                setBoards(data.boards.filter(board => board.owner))
            }
    })()

    }

    return (
        <UserSearchFlyoutContainer ref={clickCheck}>
            <SearchBar
                placeholder='search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <UserResultsContainer>
                {filteredSearch && filteredSearch.map(listedUser => (
                    <UserContainer key={listedUser.id} onClick={() => setActiveUserId(listedUser.id)} active={listedUser.id === activeUserId}>{listedUser.username}</UserContainer>
                ))}
            </UserResultsContainer>
            <Button>Request Access</Button>
            <Button onClick={handleGetSessionUserBoards}>Grant Access</Button>
            <UserBoardsContainer>
                {boards && boards.map(board => (
                    <BoardContainer key={board.id}>{board.name}</BoardContainer>
                ))}
            </UserBoardsContainer>

        </UserSearchFlyoutContainer>
    )
}



export default UserSearchFlyout
