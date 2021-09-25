import React from 'react';
import { useDispatch } from 'react-redux';
import useBoardType from '../../context/Board';
import useBoardsType from '../../context/Boards';
import { logout } from '../../store/session';
import { ButtonAlt } from '../StyledComponents';

const LogoutButton = () => {
    const { setUsersBoards } = useBoardsType()
    const { setDisplayBoard, setDisplayBoardData } = useBoardType()
    const dispatch = useDispatch()
    const onLogout = async (e) => {
        await dispatch(logout());
        setUsersBoards(null)
        setDisplayBoard(null)
        setDisplayBoardData(null)
    };

    return <ButtonAlt onClick={onLogout}>Logout</ButtonAlt>;
};

export default LogoutButton;
