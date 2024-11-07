// Import the React library for component functionality and JSX support.
import React, { useEffect, useContext } from 'react';

// Import the CartItems component, which displays the list of items in the shopping cart.
import CartItems from '../Components/CartItems/CartItems';

import { ShopContext } from '../Context/ShopContext'; // Import the ShopContext for shop-related data and functions

// Define the Cart functional component using arrow function syntax.
const Cart = () => {

  const {getUserCart} = useContext(ShopContext);

  useEffect(() => {
    getUserCart();
  })

  return (
    // Render a div as the container for the Cart component.
    <div>
      <CartItems/>
    </div>
  )
}

export default Cart
