// Importing the axios library for making HTTP requests
import axios from "axios";
// Define the base URL for the API
const API_HOST = "http://localhost:4000";

function getCartHash(){
    const cartHash = localStorage.getItem('cartHash');
    if(!cartHash){
        const newCartHash = Date.now().toString(36) + Math.random().toString(36).substring(10);
        localStorage.setItem('cartHash', newCartHash);
        return newCartHash;
    } else {
        return cartHash;
    }
}

export function placeOrder(ccNumber, ccExpiry, ccCVV){    

    const cartHash = getCartHash();

    const body = {
        ccNum: ccNumber, 
        ccExpire: ccExpiry,
        ccCVV: ccCVV
    }

    return axios.post(
        API_HOST + "/api/orders/placeOrder", 
        body, 
        {
            headers: {
                'cart-hash': cartHash
            }
        }
    )
}

export function getOrder(orderId){
    return axios.get(API_HOST + "/api/orders/getOrder/" + orderId)
}