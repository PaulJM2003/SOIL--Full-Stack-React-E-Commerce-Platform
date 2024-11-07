import React, { createContext, useEffect, useState, useCallback } from "react";

const productRepository = require('../data/product');
const cartData = require('../data/cart');

// Create a new context for the shop, initializing as null
export const ShopContext =  createContext(null);

// Component providing the Shop context
const ShopContextProvider = (props) => {
    // State to manage cart items
    const [cartItems, setCartItems] = useState({});

    const [userCart, setUserCart] = useState({});

    const [all_product, setAllProducts] = useState([]);

    const [enrichedProducts, setEnrichedProduct] = useState({});

    useEffect(() => { 
        productRepository.getAllProducts().then((all_product) => {
            setAllProducts(all_product);
            console.log(all_product);
        }).catch((error) => {
            console.log(error);
        });
    }, [])

    const getEnrichedProductById = useCallback(async (productId) => {
        if(!productId){
            console.error("...")
            return null;
        }
        if (enrichedProducts[productId]) {
            return enrichedProducts[productId];
        }
        const enrichedProduct = await productRepository.getEnrichedProductById(productId);
        setEnrichedProduct((prev) => ({...prev, [productId]: enrichedProduct}));
        return enrichedProduct;
    }, [enrichedProducts])

    const getUserCart = async () => {
        const request = await cartData.fetchCart();
        if (request) {
            console.log(request.data);
            var diff = false;
            // Check if carts differ somehow.
            if (request.data?.CartItems?.length !== userCart?.CartItems?.length) {
                diff = true;
            } else {
                (request?.data?.CartItems || []).forEach((item) => {
                    const existingItem = userCart.CartItems.find((cartItem) => cartItem.productID === item.productID)
                    // Check if item is not present in existing cart.
                    if (!existingItem) {
                        diff = true;
                        return;
                    }
                    if (existingItem.quantity !== item.quantity) {
                        diff = true;
                    }
                })
            }
            if (diff) {
                setUserCart(request.data);
            }
            return request;
        } 
        return request;

    };

    const addItem = async (productId) => {
        await cartData.addItem(productId);
        return await getUserCart();
    }

    // Function to remove items from the cart
    const removeFromCart = async (itemId) => {
        await cartData.removeItem(itemId);
        return await getUserCart();
    }

    const clearCart = async () => {
        await cartData.destroyCart();
        return await getUserCart();
    }

    const [cartAmount, setCartAmount] = useState(0);
    useEffect(() => {
        if(!userCart?.CartItems) {
            return;
        }
        Promise.all(userCart?.CartItems?.map((item) => {
            return getEnrichedProductById(item?.productID).then((product) => {
                return product.price * item.quantity;
            })
        })).then((prices) => {
            const total = prices.reduce((acc, price) => acc + price, 0);
            if(total !== cartAmount) {
                setCartAmount(total);
            }
        })
    }, [userCart, cartAmount, getEnrichedProductById]);

    const [cartItemCount, setCartItemCount] = useState(0);
    useEffect(() => {
        const count = userCart?.CartItems?.length || 0;
        if(count !== cartItemCount) {
            setCartItemCount(count);
        }
    }, [userCart, cartItemCount]);

    // Object containing all context values to be provided
    const contextValue = { 
        all_product,
        getEnrichedProductById,

        userCart,
        getUserCart,
        addItem,
        removeFromCart,
        clearCart,

        cartAmount,
        cartItemCount,
    };
    
    // Provider component to pass context values to children
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

// Export the ShopContextProvider for use in other parts of the application
export default ShopContextProvider;
