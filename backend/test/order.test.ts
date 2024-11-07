import { Request, Response } from 'express';
import {config} from 'dotenv';

/**
 * Cart controller "Unit" testing.
 * In an ideal world the DB should be properly mocked as well, 
 * but the current implementation of the cart controller
 * makes that difficult without a refactor.
 */

describe('Cart Controller', () => {

    let res: Response;

    config({
        path: './.env_hburr'
    });

    const _db = require('../src/database');

    const { placeOrder } = require('../src/controllers/order.controller');

    const { addItem } = require('../src/controllers/cart.controller');
    
    beforeEach(() => {
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown as Response;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // placeOrder unit tests

    test('placeOrder should return a 400 status if the cart is empty', async () => {
        const req = {
            headers: {
                'cart-hash': "cartHash4"
            },
            body: {
                ccNum: "5555555555554444",
                ccExpiry: "12/24", 
                ccCVV: "000"
            }
        } as unknown as Request;
        await placeOrder(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    });

    test('placeOrder should return a 400 if credit card number is invalid', async () => {
        const req = {
            headers: {
                'cart-hash': "cartHash5"
            },
            body: {
                ccNum: "superInvalidCardNumber",
                ccExpiry: "12/24", 
                ccCVV: "000"
            }
        } as unknown as Request;
        await placeOrder(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    });

    test('placeOrder should return a 400 if credit card expiry is the past', async () => {
        const req = {
            headers: {
                'cart-hash': "cartHash6"
            },
            body: {
                ccNum: "5555555555554444",
                ccExpiry: "12/22", 
                ccCVV: "000"
            }
        } as unknown as Request;
        await placeOrder(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    });

    test('placeOrder should return a 200 if checking out with a valid cart', async () => {
        const addItemReq = {
            headers: {
                'cart-hash': "cartHash3"
            },
            body: {
                // ProductID one will already exist from seed data.
                productID: 1,
                quantity: 1
            }
        } as unknown as Request;
        await addItem(addItemReq, res);
        const placeOrderReq = {
            headers: {
                'cart-hash': "cartHash7"
            },
            body: {
                ccNum: "5555555555554444",
                ccExpiry: "12/24", 
                ccCVV: "000"
            }
        } as unknown as Request;
        await placeOrder(placeOrderReq, res);
        expect(res.status).toHaveBeenCalledWith(200);
    })

});