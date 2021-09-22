import { useState } from 'react';
import { Modal } from '../../../context/Modal';
import { Button } from '../../StyledComponents';
import SignUpForm from './SignUpForm';



function SignupModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Button onClick={() => setShowModal(true)}>Sign up</Button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignUpForm setShowModal={setShowModal} />
                </Modal>
            )}

        </>
    );
}


export default SignupModal;
