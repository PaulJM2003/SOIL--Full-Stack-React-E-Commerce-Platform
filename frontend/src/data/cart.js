// Importing the axios library for making HTTP requests
import axios from "axios";
// Define the base URL for the API
const API_HOST = "http://localhost:4000";

export function getCartHash(){
    const cartHash = localStorage.getItem('cartHash');
    if(!cartHash){
        const newCartHash = Date.now().toString(36) + Math.random().toString(36).substring(10);
        localStorage.setItem('cartHash', newCartHash);
        return newCartHash;
    } else {
        return cartHash;
    }
}

export function unsetCartID(){
    localStorage.removeItem('cartHash');
}

export function fetchCart(){

    const cartHash = getCartHash();

    return axios.get(API_HOST + "/api/cart/getCart", {
        headers: {
            'cart-hash': cartHash
        }
    })

}

export function addItem(productID){

    const cartHash = getCartHash();

    return axios.post(API_HOST + "/api/cart/addItem", {
        productID: productID
    }, {
        headers: {
            'cart-hash': cartHash
        }
    })

}

export function removeItem(productID){

    const cartHash = getCartHash();

    return axios.post(API_HOST + "/api/cart/removeItem", {
        productID: productID
    }, {
        headers: {
            'cart-hash': cartHash
        }
    })

}

export function updateItemCount(productID, quantity){

    if(quantity < 1){
        return removeItem(productID);
    }

    const cartHash = getCartHash();

    return axios.post(API_HOST + "/api/cart/updateItem", {
        productID: productID,
        quantity: quantity
    }, {
        headers: {
            'cart-hash': cartHash
        }
    })

}

export function destroyCart(){

    const cartHash = getCartHash();

    return axios.post(API_HOST + "/api/cart/destroyCart", {}, {
        headers: {
            'cart-hash': cartHash
        }
    })

}