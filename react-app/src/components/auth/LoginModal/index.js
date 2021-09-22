import { useState } from 'react';
import { Modal } from '../../../context/Modal';
import { Button } from '../../StyledComponents';
import LoginForm from './LoginForm'
import styled from 'styled-components';

const LoginButton = styled(Button)`
    margin-right: 10px;
`;

function LoginModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <LoginButton onClick={() => setShowModal(true)}>Log in</LoginButton>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm setShowModal={setShowModal} />
                </Modal>
            )}

        </>
    );
}


export default LoginModal;
