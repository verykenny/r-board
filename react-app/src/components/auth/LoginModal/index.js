import { useState } from 'react';
import { Modal } from '../../../context/Modal';
import { Button } from '../../StyledComponents';
import LoginForm from './LoginForm'



function LoginModal({ imageId, user, display = false }) {
    const [showModal, setShowModal] = useState(display);

    return (
        <>
            <div>
                <Button onClick={() => setShowModal(true)}>Log in</Button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm setShowModal={setShowModal} />
                </Modal>
            )}

        </>
    );
}


export default LoginModal;
