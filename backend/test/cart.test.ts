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

    const { getCart, addItem, destroyCart,  removeItem, updateItemQuantity} = require('../src/controllers/cart.controller');

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

    // getCart unit test
    test('getCart should always return a cart', async () => {
        const req = {
            headers: {
                'cart-hash': "cartHash1"
            }
        } as unknown as Request;
        await destroyCart(req, res);
        const cart = await getCart(req, res);
        expect(cart).toEqual({cart: expect.any(Object)});
    })

    // addItem unit test
    test('addItem should add items to the list of CartItems', async () => {
        const req = {
            headers: {
                'cart-hash': "cartHash2"
            },
            body: {
                // ProductID one will already exist from seed data.
                productID: 1,
                quantity: 1
            }
        } as unknown as Request;
        await destroyCart(req, res);
        const result = await addItem(req, res);
        const cartResult = await getCart(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(cartResult.cart.CartItems[0].productID).toEqual(1)
    })

    test('removeItem should remove an item added to the cart', async () => {
        // Add item
        const req = {
            headers: {
                'cart-hash': "cartHash3"
            },
            body: {
                // ProductID one will already exist from seed data.
                productID: 1,
                quantity: 1
            }
        } as unknown as Request;
        await destroyCart(req, res);
        const result = await addItem(req, res);
        const cartResult = await getCart(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(cartResult.cart.CartItems[0].productID).toEqual(1)

        // Test removal
        const removeReq = {
            headers: {
                'cart-hash': "cartHash3"
            },
            body: {
                productID: 1
            }
        } as unknown as Request;
        await destroyCart(req, res);
        const removeResult = await removeItem(removeReq, res);
        const cartAfterRemove = await getCart(removeReq, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(cartAfterRemove.cart.CartItems.length).toEqual(0);
    })

});