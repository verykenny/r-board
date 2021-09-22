import { useState } from 'react';
import { Modal } from '../../../context/Modal';
import { Button } from '../../StyledComponents';
import LoginForm from './LoginForm'



function LoginModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Button onClick={() => setShowModal(true)}>Log in</Button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm setShowModal={setShowModal} />
                </Modal>
            )}

        </>
    );
}


export default LoginModal;
