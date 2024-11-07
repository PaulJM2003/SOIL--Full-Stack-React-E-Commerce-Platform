import { Association, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import CartItem, { CartItemDefinition, CartItemModel } from "./cartItem";

export interface CartModel extends Model<InferAttributes<CartModel>, InferCreationAttributes<CartModel>> {
    cartID: CreationOptional<number>
    cartHash: string;
    lockCart: boolean;
    CartItems?: CartItemModel[];
}

export default function Cart(sequalize: Sequelize, dataTypes: typeof DataTypes, cartItemDefinition: ReturnType<typeof CartItem>){

    const Cart = sequalize.define<CartModel>('Cart', {
        // Internally tracked cartID
        cartID: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        cartHash: {
            type: dataTypes.STRING,
            unique: true, 
            allowNull: false
        },
        lockCart: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        tableName: 'cart'
    });

    Cart.hasMany(cartItemDefinition, { foreignKey:"cartID", onDelete: 'CASCADE', onUpdate: 'CASCADE'});

    return Cart;

}

export type CartDefinition = ReturnType<typeof Cart>;