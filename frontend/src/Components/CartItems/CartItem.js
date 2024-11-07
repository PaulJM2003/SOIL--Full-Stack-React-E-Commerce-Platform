import { ShopContext } from '../../Context/ShopContext'; // Import the ShopContext for shop-related data and functions
import React, { useContext, useState, useEffect } from 'react';

const CartItem = ({ productID, quantity }) => {
    
    const {getEnrichedProductById, removeFromCart} = useContext(ShopContext); // Destructure necessary values and functions from context    

    const [product, setProductDetails] = useState({});
    useEffect(() => {
        getEnrichedProductById(productID).then((product) => {
            setProductDetails(product);
        }).catch((error) => {
            console.log(error);
        })
    }, [productID, getEnrichedProductById])

    console.log(product)

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
        <div className='cartitems-format-main'>
            <img src={productImage} alt="" className='carticon-product-icon' />
            <p>{product.name}</p>
            <p>${product.price}</p>
            <p>{quantity}</p>
            <p>${product.price}</p>
            <p
                onClick={() => removeFromCart(productID)}
                style={{ cursor: 'pointer' }}
            >Remove</p>
        </div>
    )

}

export default CartItem