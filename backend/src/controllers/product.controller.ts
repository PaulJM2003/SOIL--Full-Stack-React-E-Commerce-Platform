
import { Sequelize } from "sequelize"
import _db from "../database"
import { ProductDefinition } from "../database/models/product"
import { CartDefinition, CartModel } from "../database/models/cart"
import { CartItemDefinition } from "../database/models/cartItem"
import {Request, Response} from "express"
import { ProductImageDefinition } from "../database/models/productImage"


interface DB {
    sequelize: Sequelize
    product: ProductDefinition
    cart: CartDefinition
    cartItem: CartItemDefinition
    productImage: ProductImageDefinition
}

// TODO add database/index typedef
const db = _db as DB;

export function fetchAllProducts(req: Request, res: Response) {

    const filters = {
        category: req.query?.category?.toString() ?? undefined, 
        isFeatured: req.query?.isFeatured?.toString() === "true" ?? undefined,
    }

    console.log(filters)

    // https://stackoverflow.com/questions/35592394/remove-falsy-values-in-object
    const validFilters = Object.entries(filters).reduce((a,[k,v]) => ( !v ? a : (a[k]=v, a)), {})

    db.product.findAll({
        where: validFilters
    }).then((products) => {
        res.send(products);
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Unable to fetch products");
    })

    return res;
    
}

export function fetchProduct(req: Request, res: Response) {

    const productID = req.params.id;

    if(!productID){
        res.status(400).send("Product ID is required");
        return;
    }

    db.product.findOne({
        where: {
            productID
        }
    }).then((products) => {
        res.send(products);
    }).catch((err) => {
        res.status(500).send("Unable to fetch products");
    })

    return res;
}

export function fetchEnrichedProduct(req: Request, res: Response) {

    const productID = req.params.id;

    if(!productID){
        res.status(400).send("Product ID is required");
        return;
    }

    db.product.findOne({
        where: {
            productID
        }, 
        include: [
            db.productImage, 
            // review
        ]

    }).then((products) => {
        res.send(products);
    }).catch((err) => {
        res.status(500).send("Unable to fetch products");
    })

    return res;
}

