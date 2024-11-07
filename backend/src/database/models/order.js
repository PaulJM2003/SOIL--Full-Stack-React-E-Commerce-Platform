"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Order(sequalize, dataTypes, cartDefinition) {
    var Order = sequalize.define('Order', {
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
exports.default = Order;
