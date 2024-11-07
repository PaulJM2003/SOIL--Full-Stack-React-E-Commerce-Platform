import { Sequelize } from "sequelize"
import _db from "../database"
import { ProductDefinition } from "../database/models/product"
import { CartDefinition, CartModel } from "../database/models/cart"
import { CartItemDefinition } from "../database/models/cartItem"
import {Request, Response} from "express"
import {getCart } from "./cart.controller"
import { OrderDefinition } from "../database/models/order"
import { validateCardDetails } from "../util/validateCC"


interface DB {
    sequelize: Sequelize
    product: ProductDefinition
    cart: CartDefinition
    cartItem: CartItemDefinition
    order: OrderDefinition
}

// TODO add database/index typedef
const db = _db as DB;

// Place order
export async function placeOrder(req: Request, res: Response) {
    
    const {ccNum, ccExpire, ccCVV} = req.body;

    if(!ccNum || !ccExpire || !ccCVV){
        res.status(400).send("Credit card details are required")
        return;
    }

    // Validate credit card details
    if (!validateCardDetails(ccNum, ccExpire, ccCVV)) {
        res.status(400).send("Invalid credit card details");
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

    cartFetchResult.cart.lockCart = true;    

    const enrichedCartItems = await Promise.all((cartFetchResult.cart.CartItems || []).map((cartItem) => {
        return db.product.findOne({
            where: {
                productID: cartItem.productID
            }
        }).then((product) => {
            return {
                ...cartItem,
                product
            }
        })
    }))

    const orderTotal = enrichedCartItems.reduce((total, cartItem) => {
        return total + ((cartItem?.product?.price || 0) * cartItem.quantity)
    }, 0)

    if(orderTotal === 0){
        res.status(400).send("Cart is empty")
        return;
    }
    
    db.order.create({
        orderTotal,
        cartID: cartFetchResult.cart.cartID,
        orderStatus: "processed",
    }).then((order) => {
        res.status(200).send(order)
        return;
    }).catch((err) => {
        res.status(500).send("Unable to create order")
        return;
    })
}

export function getOrder(req: Request, res: Response) {
    db.order.findOne({
        where:{
            orderID: Number.parseInt(req.query.orderID?.toString() ?? "-1")
        }, 
    }).then((order) => {
        if(!order){
            res.status(404).send("Order not found")
        } else {
            res.status(200).send(order)
        }
        return;
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Unable to fetch orders")
        return;
    })
}