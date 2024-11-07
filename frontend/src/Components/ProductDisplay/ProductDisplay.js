import React, { useContext, useState, useEffect } from 'react'
import './ProductDisplay.css' // Import the CSS for styling the product display

import { ShopContext } from '../../Context/ShopContext'; // Import the ShopContext to use shop-related functionalities

const ProductDisplay = (props) => {
    const {product} = props; // Destructure product from props
    const {addItem} = useContext(ShopContext); // Use addToCart function from context

    const [productImage, setProductImage] = useState(null);
    useEffect(() => {
        if (product.ProductImages) {
        const byteArr = product.ProductImages[0].image.data;
        const blob = new Blob([new Uint8Array(byteArr)], {type: 'image/png'});
        const encodedImage = URL.createObjectURL(blob);
        setProductImage(encodedImage);
        }
    }, [product.ProductImages]);

    return (
        <div className='productdisplay'>
            {/* Left side: Display product images */}
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={productImage} alt="" /> {/* Thumbnail or list of product images */}
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={productImage} alt="" /> {/* Main product image */}
                </div>
            </div>
            {/* Right side: Display product details */}
            <div className="productdisplay-right">
                <h1>{product.name}</h1> {/* Product name */}
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-new">${product.price}</div> {/* Display the new price */}
                </div>
                <div className="productdisplay-right-description">
                    {/* Static description about the importance of fresh produce */}
                    Eating garden-picked, healthy foods is essential for
                    maintaining a balanced diet. Fresh vegetables and 
                    fruits, harvested at their peak, contain more nutrients 
                    and offer superior flavor. They support a sustainable 
                    environment and promote a healthier lifestyle for 
                    everyone.
                </div>

                {/* Button to add the product to the shopping cart */}
                <button onClick={()=>{addItem(product.productID)}}>ADD TO CART</button>
            </div>
        </div>
    )
}

export default ProductDisplay
