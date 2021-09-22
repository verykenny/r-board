import { createContext, useContext, useRef, useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import './Modal.css';
import styled from 'styled-components';

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalBackround = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.354);
`;

const ModalContent = styled.div`
    position: absolute;
    background-color: white;
    border-radius: 2px;
    max-width: 95%;
`;



export const ModalContext = createContext();

export function ModalProvider({ children }) {
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current);
    }, [])

    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
}

export function Modal({ onClose, children }) {
    const modalNode = useContext(ModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <ModalContainer id="modal">
            <ModalBackround id="modal-background" onClick={onClose} />
            <ModalContent id="modal-content">
                {children}
            </ModalContent>
        </ModalContainer>,
        modalNode
    );
}
