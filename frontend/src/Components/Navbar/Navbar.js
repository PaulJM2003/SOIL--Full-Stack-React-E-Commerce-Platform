// Navbar.js
import React, { useContext, useRef, useState } from 'react';
import './Navbar.css'; // Stylesheet for the navbar
import logo from '../Assets/logo.png'; // Logo image
import cart_icon from '../Assets/cart_icon.png'; // Shopping cart icon
import nav_dropdown from '../Assets/nav_dropdown.png'; // Dropdown menu icon
import { Link } from 'react-router-dom'; // Router link component for navigation
import { ShopContext } from '../../Context/ShopContext'; // Shop context for cart items
import AccountButton from './AccountButton' // Component for account related actions

const Navbar = () => {
    const [menu, setMenu] = useState("shop"); // State for active menu item
    const { userCart } = useContext(ShopContext); // Get total cart items from context
    const menuRef = useRef(); // Reference to the menu for manipulation

    // Toggles dropdown visibility on click
    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    };

    return (
        <div className='navbar'>
            {/* Logo and home link */}
            <Link style={{ textDecoration: 'none', color: '#539c2f' }} to='/' onClick={() => { setMenu("shop") }} className="nav-logo">
                <img src={logo} alt="" />
                <p>SOIL</p>
            </Link>
            {/* Dropdown toggle for mobile view */}
            <img onClick={dropdown_toggle} className='nav-dropdown' src={nav_dropdown} alt="" />
            {/* Navigation menu items */}
            <ul ref={menuRef} className="nav-menu">
                {/* List item for Shop with conditional rendering of underline */}
                <li onClick={() => { setMenu("shop") }}>
                    <Link style={{ textDecoration: 'none', color: '#539c2f' }} to='/'>Shop</Link>
                    {menu === "shop" ? <hr /> : <></>}
                </li>
                {/* Other navigation items with similar structure */}
                <li onClick={() => { setMenu("diary") }}>
                    <Link style={{ textDecoration: 'none', color: '#539c2f' }} to='/diary'>Diary</Link>
                    {menu === "diary" ? <hr /> : <></>}
                </li>
                {/* Repeated for each category with appropriate href */}
                <li onClick={() => { setMenu("fruit") }}>
                    <Link style={{ textDecoration: 'none', color: '#539c2f' }} to='/fruit'>Fruits</Link>
                    {menu === "fruit" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("vegetable") }}>
                    <Link style={{ textDecoration: 'none', color: '#539c2f' }} to='/vegetable'>Vegetables</Link>
                    {menu === "vegetable" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("diet") }}>
                    <Link style={{ textDecoration: 'none', color: '#539c2f' }} to='/diet'>Diet</Link>
                    {menu === "diet" ? <hr /> : <></>}
                </li>
            </ul>
            {/* Account button and cart icon with dynamic cart count display */}
            <div className="nav-login-cart">
              <AccountButton />
              <Link to='/cart'><img src={cart_icon} alt="" /></Link>
              <div className="nav-cart-count">{userCart?.CartItems?.length}</div>
            </div>
        </div>
    );
};

export default Navbar;
