import { useState } from 'react';
import { Modal } from '../../../context/Modal';
import { Button } from '../../StyledComponents';
import SignUpForm from './SignUpForm';
import styled from 'styled-components';

const SignUpButton = styled(Button)`
    margin-right: 10px;
`;

function SignupModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <SignUpButton onClick={() => setShowModal(true)}>Sign up</SignUpButton>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignUpForm setShowModal={setShowModal} />
                </Modal>
            )}

        </>
    );
}


export default SignupModal;
