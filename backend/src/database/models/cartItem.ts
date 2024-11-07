import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import Product from "./product";

export interface CartItemModel extends Model<InferAttributes<CartItemModel>, InferCreationAttributes<CartItemModel>> {
    cartItemID: CreationOptional<number>;
    quantity: number;
    productID: number;
    cartID?: number;
}

export default function CartItem(sequalize: Sequelize, dataTypes: typeof DataTypes, productDefinition: ReturnType<typeof Product>){

    const CartItem = sequalize.define<CartItemModel>('CartItem', {
        cartItemID: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: false
        }, 
        productID: {
            type: dataTypes.INTEGER,
            allowNull: false
        }, 
    }, {
        tableName: 'cartItems'
    });

    CartItem.belongsTo(productDefinition, {  foreignKey: "productID", foreignKeyConstraint: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' });

    return CartItem;

}

export type CartItemDefinition = ReturnType<typeof CartItem>;