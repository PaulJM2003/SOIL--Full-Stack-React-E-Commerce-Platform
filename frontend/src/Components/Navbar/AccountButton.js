
import React, {useContext} from 'react';
import { AuthContext } from '../../Context/AuthenticationContext';
import {useNavigate } from 'react-router-dom';
import "./Navbar.css"

const AccountButton = () => {

    const navigate = useNavigate();
    const { authenticatedUser } = useContext(AuthContext)
    
  const handleButtonClick = () => {
    if (authenticatedUser) {
      navigate("/account")
    } else {
      navigate('/login');
    }
  };

  return (
    <button onClick={handleButtonClick}>
      {authenticatedUser ? 'Account' : 'Login'}
    </button>
  );
};

export default AccountButton;
