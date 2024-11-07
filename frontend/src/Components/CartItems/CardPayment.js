import React, { useState, useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './CardPayment.css';
import jsPDF from 'jspdf';  // Import jsPDF

import * as order from "../../data/order.js"

const CardPayment = () => {
    const { cartAmount, userCart, getEnrichedProductById } = useContext(ShopContext);
    const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
    const [error, setError] = useState('');
    const [showPopup, setShowPopup] = useState(false);  // State to control the visibility of the popup

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCardDetails(prevDetails => ({ ...prevDetails, [name]: value }));
        setError(''); // Reset error message on new input
    };

    const generatePDF = async (orderID) => {
        const doc = new jsPDF();
        doc.text('Payment Invoice', 105, 20, null, null, 'center');
        doc.text(`OrderID: ${orderID}`, 20, 40);
        doc.text(`Name: ${cardDetails.name}`, 20, 50);
        var y = 70;
        const products = await Promise.all(userCart?.CartItems?.map((item) => {
            return getEnrichedProductById(item?.productID).then((product) => {
                return {...product, quantity: item.quantity};
            })
        }));

        (products).forEach((product) => {
            doc.text(`${product.name} - ${product.quantity}`, 20, y);
            y+=10
        });
        doc.text(`Amount Paid: $${cartAmount}`, 20, y+10);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, y+20);
        doc.save('invoice.pdf');
        setShowPopup(true); // Show the popup after saving the PDF
    };

    const submitPayment = async () => {
        try{
            const placeOrderResult = await order.placeOrder(cardDetails.number, cardDetails.expiry, cardDetails.cvv);
            const orderID = placeOrderResult?.data?.orderID;
            if(!orderID){
                setError("Error placing order. Please try again.");
                return;
            }
            generatePDF(orderID);
            window.localStorage.removeItem('cartHash'); // Clear the cart hash
            return;
        } catch(error){
            console.error("Error placing order:", error);
            setError("Error placing order. Please try again.");
            return;
        }
    };

    const closeModal = () => {
        setShowPopup(false);
        window.location.reload(); // Reload the page
    };

    return (
        <div className="card-payment-container">
            <div className="card-payment">
                <input type="text" name="number" placeholder="Card Number" onChange={handleInputChange} value={cardDetails.number} />
                <input type="text" name="name" placeholder="Name on Card" onChange={handleInputChange} value={cardDetails.name} />
                <input type="text" name="expiry" placeholder="Expiry MM/YY" onChange={handleInputChange} value={cardDetails.expiry} />
                <input type="text" name="cvv" placeholder="CVV" onChange={handleInputChange} value={cardDetails.cvv} />
                <button onClick={submitPayment}>Pay ${cartAmount}</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            {showPopup && (
                <div className="modal-background">
                    <div className="modal-content">
                        <p>Thank you for your payment!</p>
                        <p>Your invoice has been downloaded.</p>
                        <button className="modal-button" onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardPayment;
