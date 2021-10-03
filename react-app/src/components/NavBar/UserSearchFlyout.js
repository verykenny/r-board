import styled from "styled-components"
import { Button, FlyOutContainer } from "../StyledComponents";
import { CSSTransition } from 'react-transition-group'
import { useState, useEffect, useRef } from "react";
import useDebounce from "../hooks/useDebounce";
import { useSelector } from 'react-redux'
import useBoardsType from "../../context/Boards";

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

    background-color: ${props => (props.active) ? '#2D75FC' : 'none'};
`;

const UserBoardsContainer = styled.div`

`;
const BoardContainer = styled.div`
    cursor: pointer;

    background-color: ${props => (props.active) ? '#2D75FC' : 'none'};

`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;


const RequestTypeButton = styled(Button)`
    background: #595A4A;

    &:disabled {
        background: #2D75FC;
        cursor: auto;
        &:hover {
            filter: brightness(1)
        }
    }
`;

const AlreadySubmittedButton = styled(Button)`
    &:disabled {
        background: #595A4A;
        cursor: auto;
        &:hover {
            filter: brightness(1)
        }
    }

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


function UserSearch({ setUserSearchToggle }) {
    const user = useSelector(state => state.session.user);
    const [users, setUsers] = useState([])
    const [filteredSearch, setFilteredSearch] = useState([])
    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search, 250);
    const [boards, setBoards] = useState([])
    const [activeUserId, setActiveUserId] = useState(null)
    const [activeBoardId, setActiveBoardId] = useState(null)
    const [requestType, setRequestType] = useState(null)
    const { usersBoards, setUsersBoards } = useBoardsType();

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
        setActiveBoardId(null)
        setActiveUserId(null)
        setBoards([])
        setRequestType(null)
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


    const handleGetUserBoards = (userId) => {
        (async () => {
            const response = await fetch(`/api/users/${userId}/boards`)
            const data = await response.json()
            if (data.errors) {
                console.log(data.errors);
            } else {
                setBoards(data.boards)
            }
        })()
    }


    const handleSubmitRequest = () => {
        (async () => {
            const response = await fetch(`/api/users/${user.id}/boards/${activeBoardId}`, { method: 'POST' })
            const data = await response.json()
            if (data.errors) {
                console.log(data.errors);
            } else {
                setUsersBoards(prev => [...prev, data.board])
                setUserSearchToggle(false);
            }
        })()
    }

    const handleGrantAccess = () => {
        (async () => {
            await fetch(`/api/users/${activeUserId}/boards/${activeBoardId}`, { method: 'POST' })
            const altResponse = await fetch(`/api/board_users/users/${activeUserId}/boards/${activeBoardId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    verified: true
                })
            })
            const data = await altResponse.json()
            if (data.errors) {
                console.log(data.errors);
            } else {
                setUserSearchToggle(false);
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
                    <UserContainer key={listedUser.id} onClick={() => {
                        setActiveUserId(listedUser.id)
                        setActiveBoardId(null)
                        setRequestType(null)
                    }} active={listedUser.id === activeUserId}>{listedUser.username}</UserContainer>
                ))}
            </UserResultsContainer>
            {activeUserId && (
                <ButtonContainer>
                    <RequestTypeButton disabled={requestType === 'request'} onClick={() => {
                        handleGetUserBoards(activeUserId)
                        setRequestType('request')
                        setActiveBoardId(null)

                    }}>Request Access</RequestTypeButton>
                    <RequestTypeButton disabled={requestType === 'grant'} onClick={() => {
                        handleGetUserBoards(activeUserId)
                        setRequestType('grant')
                        setActiveBoardId(null)
                    }}>Grant Access</RequestTypeButton>
                </ButtonContainer>
            )}
            <UserBoardsContainer>
                {(boards && requestType === 'request') && boards.filter(board => board.owner).map(board => (
                    <BoardContainer key={board.id} onClick={() => setActiveBoardId(board.id)} active={board.id === activeBoardId}>{board.name}</BoardContainer>
                ))}
                {(boards && requestType === 'grant') && usersBoards.map(board => {
                    if (boards.map(listedBoard => listedBoard.id).includes(board.id) || !board.owner) {
                        return '';
                    }
                    return (
                        <BoardContainer key={board.id} onClick={() => setActiveBoardId(board.id)} active={board.id === activeBoardId}>{board.name}</BoardContainer>
                    )
                })}
            </UserBoardsContainer>
            {(!usersBoards.map(board => board.id).includes(activeBoardId) && requestType === 'request') && (
                <>
                    {(requestType === 'request' && activeBoardId) && (<Button onClick={handleSubmitRequest}>Submit Request</Button>)}
                </>
            )}

            {(usersBoards.map(board => board.id).includes(activeBoardId) && requestType === 'request') && (
                <AlreadySubmittedButton disabled>Request Already Submitted</AlreadySubmittedButton>
            )}

            {(requestType === 'grant' && activeBoardId) && (<Button onClick={handleGrantAccess}>Approve Access</Button>)}


        </UserSearchFlyoutContainer>
    )
}



export default UserSearchFlyout
