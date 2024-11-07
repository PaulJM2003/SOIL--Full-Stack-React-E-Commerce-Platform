import React, { useState, useContext, useRef, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './CSS/LoginSignup.css';
import { AuthContext } from '../Context/AuthenticationContext';

const Login = () => {
    const { login, authenticatedUser } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState(false);

    const formValues = useRef({ username: '', password: '' });

    useEffect(() => {
        formValues.current = { username, password };
    }, [username, password]);

    const validateFields = () => {
        const { username, password } = formValues.current;
        if (!username || !password) {
            setFormError('Please fill in all fields');
            return false;
        }
        return true;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;

        const { username, password } = formValues.current;
        try {
            const success = await login(username, password);
            if (!success) {
                setFormSuccess(false);
                setFormError('Invalid email or password');
            } else {
                setFormError('');
                setFormSuccess(true);
            }
        } catch (error) {
            setFormSuccess(false);
            setFormError('Invalid email or password');
        }
    };

    const FormSuccess = () => (
        <>
            <h1>Login Success</h1>
            <p>You have logged in successfully</p>
            <button>Continue</button>
            <Navigate to="/account" />
        </>
    );

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>Login</h1>
                <form className="loginsignup-fields" onSubmit={onSubmit}>
                    {formSuccess ? <FormSuccess /> : <>
                        <input type="text" placeholder='User Name' value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <p>{formError}</p>
                        <button type="submit">Login</button>
                    </>}
                </form>
                <p className="loginsignup-login">Don't have an account?<a href="/signup">Signup here</a></p>
            </div>
        </div>
    );
};

export default Login;






