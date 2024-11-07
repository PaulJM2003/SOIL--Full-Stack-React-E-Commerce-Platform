import React from 'react';
import './Breadcrum.css'; // Import CSS for styling the breadcrumb navigation
import arrow_icon from '../Assets/breadcrum_arrow.png'; // Import the arrow icon used in the breadcrumb

const Breadcrum = (props) => {
    const {product} = props; // Destructure product from props to access its details

    return (
        <div className='breadcrum'>
            {/* Breadcrumb navigation displaying the path to the current product */}
            HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {product.category} <img src={arrow_icon} alt="" /> {product.name}
        </div>
    )
}

export default Breadcrum; // Export the Breadcrum component
