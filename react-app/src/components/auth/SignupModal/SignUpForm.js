import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import styled from 'styled-components';
import { signUp } from '../../../store/session';
import { Button, Form, FormContainer, InputsContainer, StringInput } from '../../StyledComponents';

const SignInFormContainer = styled(FormContainer)`
    height: fit-content;
`;


const SignUpForm = ({ setShowModal }) => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const dispatch = useDispatch();

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const data = await dispatch(signUp(username, email, password));
            if (data) {
                setErrors(data)
            }
        } else {
            setErrors(['Error: Both passwords must match'])
        }
    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    };

    return (
        <SignInFormContainer>
            <h1>rBoard</h1>
            <p>Don't forget soccer practice!</p>

            <Form onSubmit={onSignUp}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error.split(':')[1]}</div>
                    ))}
                </div>
                <InputsContainer>

                    <StringInput
                        type='text'
                        name='username'
                        placeholder='Username'
                        onChange={updateUsername}
                        value={username}
                    />


                    <StringInput
                        type='text'
                        name='email'
                        placeholder='Email'
                        onChange={updateEmail}
                        value={email}
                    />


                    <StringInput
                        type='password'
                        name='password'
                        placeholder='Password'
                        onChange={updatePassword}
                        value={password}
                    />


                    <StringInput
                        type='password'
                        name='repeat_password'
                        placeholder='Confirm Password'
                        onChange={updateRepeatPassword}
                        value={repeatPassword}
                    />
                </InputsContainer>
                <Button type='submit'>Sign up</Button>
            </Form>
        </SignInFormContainer>
    );
};

export default SignUpForm;
