
import { Sequelize } from "sequelize"
import _db from "../database"
import { ProductDefinition } from "../database/models/product"
import { CartDefinition, CartModel } from "../database/models/cart"
import { CartItemDefinition } from "../database/models/cartItem"
import {Request, Response} from "express"


interface DB {
    sequelize: Sequelize
    product: ProductDefinition
    cart: CartDefinition
    cartItem: CartItemDefinition
}

// TODO add database/index typedef
const db = _db as DB;

type GetCartResult = {
    cart: CartModel
} | {
    error: string
}

// Fetch cart or create a new one
export async function getCart(req: Request, res: Response): Promise<GetCartResult> {
    if(!req.headers["cart-hash"]){
        return {
            error: "cartHash is required"
        }
    }

    const cartHash = req.headers["cart-hash"] as string;

    const cart = await db.cart.findOne({
        where: {
            cartHash
        },
        include: [db.cartItem]
    });
    console.log({cart,cartHash})
    if(cart){
        return {cart};
    }
    else{
        const cart = await db.cart.create({
            cartHash, 
            lockCart: false
        });
        return {cart};
    }
}

// Fetch cart
export async function fetchCart(req: Request, res: Response) {
    try{
        const cartFetchResult = await getCart(req, res);
        if("error" in cartFetchResult){
            res.status(500).send(cartFetchResult.error)
            return;
        }

        res.status(200).send(cartFetchResult.cart)

    } catch(err){
        console.log(err)
        res.status(500).send("Unable to fetch cart")
    }
    return;
}

// Add item 
export async function addItem(req: Request, res: Response) {
    try{
        const {
            productID, 
        } = req.body;
        if(!productID){
            res.status(400).send("productID is required")
            return;
        }

        const cartFetchResult = await getCart(req, res);
        if("error" in cartFetchResult ){
            res.status(500).send(cartFetchResult.error)
            return;
        }
        if(!("cart" in cartFetchResult)){
            res.status(500).send("Unable to fetch cart")
            return;
        }

        if(cartFetchResult.cart.lockCart){
            res.status(400).send("Cart is locked")
        }

        const cartItem = cartFetchResult.cart.CartItems?.find((cartItem) => cartItem.productID === productID);

        if(cartItem){
            cartItem.update({
                quantity: cartItem.quantity + 1
            })
            res.status(200).send("Item added to cart")
        }
        else{
            await db.cartItem.create({
                productID,
                quantity: 1,
                cartID: cartFetchResult.cart?.cartID
            })
            res.status(200).send("Item added to cart")
        }
    } catch(err){
        console.log(err)
        res.status(500).send("Unable to add item to cart")
        return;
    }
    return;
}

// remove item
export async function removeItem(req: Request, res: Response) {
    try{


        const {
            productID, 
        } = req.body;
        if(!productID){
            res.status(400).send("productID is required")
            return;
        }
        
        const cartFetchResult = await getCart(req, res);
        if("error" in cartFetchResult){
            res.status(500).send(cartFetchResult.error)
            return;
        }
        
        if(cartFetchResult.cart.lockCart){
            res.status(400).send("Cart is locked")
            return;
        }

        const cartItem = cartFetchResult.cart.CartItems.find((cartItem) => cartItem.productID === productID);

        if(cartItem){
            cartItem.destroy()
            res.status(200).send("Item removed from cart")
            return;
        }
        else{
            res.status(400).send("Item not found in cart")
            return;
        }
    } catch(err){
        res.status(500).send("Unable to remove item from cart.")
        return;
    }
    return;
}

// updateItemQuantity
export async function updateItemQuantity(req: Request, res: Response) {
    try{


        const cartFetchResult = await getCart(req, res);
        if("error" in cartFetchResult){
            res.status(500).send(cartFetchResult.error)
            return;
        }

        if(cartFetchResult.cart.lockCart){
            res.status(400).send("Cart is locked")
            return;
        }
        
        cartFetchResult.cart.destroy();

    } catch(err){
        res.status(500).send("Unable to update cart item quantity")
        return;
    }
    return;
}
// destroyCart
export async function destroyCart(req: Request, res: Response) {
    try{


        const cartFetchResult = await getCart(req, res);
        if("error" in cartFetchResult){
            res.status(500).send(cartFetchResult.error)
            return;
        }
        
        if(cartFetchResult.cart.lockCart){
            res.status(400).send("Cart is locked")
            return;
        }

        cartFetchResult.cart.destroy()

    } catch(err){
        res.status(500).send("Unable to update cart item quantity")
        return;
    }
    return;
}

// placeOrder