import React, { useContext } from 'react';
import './CartItems.css'; // Import CSS for the cart items
import CartItem from './CartItem'; 
import { ShopContext } from '../../Context/ShopContext'; // Import the ShopContext for shop-related data and functions
import remove_icon from '../Assets/cart_cross_icon.png'; // Import the icon for the remove button in the cart
import CardPayment from './CardPayment'; // Import the CardPayment component for handling payments

const CartItems = () => {
    const {userCart, cartAmount, clearCart } = useContext(ShopContext); // Destructure necessary values and functions from context

    console.log(userCart?.CartItems)

    return (
        <div className='cartitems'>
            {/* Column titles for the cart items display */}
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p
                    onClick={() => clearCart()}
                    style={{ cursor: 'pointer' }}
                >Clear all</p>
            </div>
            <hr />
            {/* Map over all products and display those that are in the cart */}
            {userCart?.CartItems?.map((cartItem) => {
                return (
                    <CartItem key={cartItem.productID} productID={cartItem.productID} quantity={cartItem.quantity}  />
                )
            })}
            {/* Container for subtotal and total calculation */}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>CART</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${cartAmount}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${cartAmount}</h3>
                        </div>
                    </div>
                </div>
                {/* Promo code input section */}
                <div className="cartitems-promocode">
                    <p>Enter your Discount Coupon :</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='CODE' />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
            {/* Payment component */}
            <CardPayment />
        </div>
    );
}

export default CartItems; // Export the CartItems component
