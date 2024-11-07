import React from 'react';
import { useNavigate } from 'react-router-dom'; // Hook for navigating programmatically
import './NewsLetter.css'; // Import CSS for the Newsletter component

const NewsLetter = () => {
  const navigate = useNavigate();  // Initialize the navigation hook

  // Function to handle the subscribe action
  const handleSubscribe = () => {
    navigate('/login');  // Navigate to the login page upon subscribing
  };

  return (
    <div className='newsletter'>
      {/* Title of the newsletter section */}
      <h1>Get More Information On Our Goods</h1>
      {/* Subscription prompt text */}
      <p>Subscribe to stay updated</p>
      <div>
        {/* Email input field */}
        <input type="email" placeholder='Your Email id' />
        {/* Subscribe button with event handler */}
        <button onClick={handleSubscribe}>Subscribe</button> 
      </div>
    </div>
  );
}

export default NewsLetter; // Export the NewsLetter component
