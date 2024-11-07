import React from 'react'
import './Footer.css' // Stylesheet for the Footer component
import footer_logo from '../Assets/logo_big.png' // Import the large logo image for the footer
import instagram_icon from '../Assets/instagram_icon.png' // Instagram icon for social media link
import pintester_icon from '../Assets/pintester_icon.png' // Pinterest icon for social media link
import whatsapp_icon from '../Assets/whatsapp_icon.png' // WhatsApp icon for social media link

const Footer = () => {
  return (
    <div className='footer'>
      {/* Logo and company name */}
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>SOIL</p>
      </div>
      {/* Navigation links in the footer */}
      <ul className="footer-links">
        <li>Products</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      {/* Social media icons */}
      <div className="footer-social-icon">
        <div className="footer-icons-container">
            <img src={instagram_icon} alt="" />
        </div>
        <div className="footer-icons-container">
            <img src={pintester_icon} alt="" />
        </div>
        <div className="footer-icons-container">
            <img src={whatsapp_icon} alt="" />
        </div>
      </div>
      {/* Copyright information */}
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2024 - s3968971 - </p>
      </div>
    </div>
  )
}

export default Footer
