import { Association, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import CartItem, { CartItemDefinition, CartItemModel } from "./cartItem";
import { CartModel } from "./cart";

export interface OrderModel extends Model<InferAttributes<OrderModel>, InferCreationAttributes<OrderModel>> {
    orderID: CreationOptional<number>
    orderStatus: string;
    orderTotal: number;
    cartID?: number;
    Cart?: CartModel;
}

export default function Order(sequalize: Sequelize, dataTypes: typeof DataTypes, cartDefinition: ReturnType<typeof CartItem>){
    const Order = sequalize.define<OrderModel>('Order', {
        orderID: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        orderStatus: {
            type: dataTypes.STRING,
            allowNull: false,
            defaultValue: "pending"
        },
        orderTotal: {
            type: dataTypes.DECIMAL,
            allowNull: false,
            defaultValue: 0.00
        }
    }, {
        tableName: 'order'
    });


    Order.belongsTo(cartDefinition, {
        foreignKey: 'cartID',
    });

    return Order;

}

export type OrderDefinition = ReturnType<typeof Order>;