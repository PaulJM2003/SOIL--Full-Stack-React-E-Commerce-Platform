"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function CartItem(sequalize, dataTypes, productDefinition) {
    var CartItem = sequalize.define('CartItem', {
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
    CartItem.belongsTo(productDefinition, { foreignKey: "productID", foreignKeyConstraint: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    return CartItem;
}
exports.default = CartItem;
