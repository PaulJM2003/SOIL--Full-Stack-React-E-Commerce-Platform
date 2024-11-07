import React, { useState, useContext, useRef, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthenticationContext';
import { personGet, Accupdate, Accdisposal } from '../data/repository';
import "./CSS/Account.css";

const Account = () => {
    const { authenticatedUser, logout } = useContext(AuthContext);
    const [editingMode, setEditingMode] = useState(false);
    const [nameInput, setName] = useState(authenticatedUser?.Name);
    const [emailInput, setEmail] = useState(authenticatedUser?.email);
    const [passwordInput, setPassword] = useState('');

    const formValues = useRef({ name: '', email: '', password: '' });

    const [formError, setFormError] = useState('');

    useEffect(() => {
        formValues.current = { name: nameInput, email: emailInput, password: passwordInput };
    }, [nameInput, emailInput, passwordInput]);

    if (!authenticatedUser) {
        return <Navigate to="/login" />;
    }

    const handleEdit = () => {
        setEditingMode(true);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = formValues.current;
        if (!name || !email || !password) {
            setFormError('Please fill in all fields');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setFormError('Please enter a valid email address');
            return;
        }

        if (password.length < 8) {
            setFormError('Password must be longer than 7 characters');
            return;
        }

        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!strongPasswordRegex.test(password)) {
            setFormError('Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character');
            return;
        }

        try {
            await Accupdate(authenticatedUser.SID, { Name: name, email, password });
            setEditingMode(false);
            setFormError('');
        } catch (error) {
            setFormError('Failed to update account: ' + error.message);
        }
    };

    const deleteAccount = async () => {
        try {
            await Accdisposal(authenticatedUser.SID);
            logout();
        } catch (error) {
            setFormError('Failed to delete account: ' + error.message);
        }
    }

    const getTimeJoined = () => {
        return new Date(authenticatedUser.createdAt).toLocaleString();
    }

    return (
        <div className="accountPage">
            <div className="accountView-container">
                <h1>Welcome {authenticatedUser.Name},</h1>
                <h1>Account Details</h1>
                <form className="accountPage-form" onSubmit={onSubmit}>
                    <label>Name</label>
                    <input
                        type="text"
                        disabled={editingMode !== true}
                        value={nameInput}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label>Email</label>
                    <input
                        type="email"
                        disabled={editingMode !== true}
                        value={emailInput}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        disabled={editingMode !== true}
                        value={passwordInput}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>Time joined</label>
                    <input
                        type="text"
                        disabled={true}
                        value={getTimeJoined()}
                    />
                    <div>
                        {editingMode ? (
                            <>
                                <p>{formError}</p>
                                <button type="submit">Save</button>
                                <button onClick={() => setEditingMode(false)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <button type="button" onClick={(e) => {
                                    e.preventDefault();
                                    handleEdit();
                                }}>Edit</button>
                            </>
                        )}
                        <button type="button" onClick={(e) => {
                            e.preventDefault();
                            logout();
                        }}>Logout</button>
                        <button className="deleteButton" type="button" onClick={(e) => {
                            e.preventDefault();
                            deleteAccount();
                        }}>Delete Account</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Account;


