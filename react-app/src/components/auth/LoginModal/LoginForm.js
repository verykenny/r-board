import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/session';
import { ButtonAlt, Form, FormContainer, StringInput, InputsContainer } from '../../StyledComponents';
import styled from 'styled-components';


const LoginForm = ({ setShowModal }) => {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const onLogin = async (e) => {
        e.preventDefault();

        const data = await dispatch(login(email, password));

        if (data) {
            setErrors(data);
        } else {
            setShowModal(false)
        }
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <FormContainer>
            <h1>rBoard</h1>
            <p>Don't forget soccer practice!</p>
            <Form onSubmit={onLogin}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <InputsContainer>
                    <StringInput
                        name='email'
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={updateEmail}
                    />
                    <StringInput
                        name='password'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={updatePassword}
                    />
                <ButtonAlt type='submit'>Login</ButtonAlt>
                </InputsContainer>
            </Form>
        </FormContainer>
    );
};

export default LoginForm;
