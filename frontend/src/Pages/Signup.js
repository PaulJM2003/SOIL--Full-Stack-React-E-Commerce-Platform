import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/LoginSignup.css';
import { makeAcc } from '../data/repository'; // Import makeAcc from repository

const LoginSignup = () => {
  const navigate = useNavigate();

  // Add state for name input
  const [nameInput, setName] = useState('');
  const [emailInput, setEmail] = useState('');
  const [passwordInput, setPassword] = useState('');
  const [usernameInput, setUsername] = useState('');

  // Initialize formValues reference to keep track of form inputs
  const formValues = useRef({
    username: '',
    email: '',
    password: '',
    name: '', // Include name in form values
  });

  // Update formValues whenever input changes
  useEffect(() => {
    formValues.current = { username: usernameInput, email: emailInput, password: passwordInput, name: nameInput };
  }, [usernameInput, emailInput, passwordInput, nameInput]);

  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // Validate form fields including name
  const validateFields = () => {
    const { username, email, password, name } = formValues.current;
    if (!username || !email || !password || !name) {
      setFormError('Please fill in all fields');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError('Please enter a valid email address');
      return false;
    }

    if (password.length < 8) {
      setFormError('Password must be longer than 7 characters');
      return false;
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      setFormError('Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character');
      return false;
    }

    return true;
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      // Ensure name is included in the user object
      const user = {
        username: usernameInput,
        email: emailInput,
        password: passwordInput,
        name: nameInput, // Ensure the 'name' field is included
      };
      await makeAcc(user);
      setFormSuccess(true);
    } catch (error) {
      setFormError('Failed to create account: ' + error.message);
    }
  };

  // Success message component
  const FormSuccess = () => {
    return (
      <div>
        <h1>Account Created</h1>
        <p>Your account has been created successfully</p>
        <button onClick={() => navigate('/account')}>Continue</button>
      </div>
    );
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <form onSubmit={onSubmit}>
          {formSuccess ? (
            <FormSuccess />
          ) : (
            <>
              <h1>Sign Up</h1>
              <div className="loginsignup-fields">
                <input
                  type="text"
                  placeholder='Your Username'
                  required
                  value={usernameInput}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="text"
                  placeholder='Your Name'
                  required
                  value={nameInput}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder='Email Address'
                  required
                  value={emailInput}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder='Password'
                  required
                  value={passwordInput}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p>{formError}</p>
              <button type="submit">Continue</button>
            </>
          )}
        </form>
        <p className="loginsignup-login">Already have an account? <a href="/login">Login here</a></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;



