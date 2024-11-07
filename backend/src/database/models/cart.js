"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Cart(sequalize, dataTypes, cartItemDefinition) {
    var Cart = sequalize.define('Cart', {
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
    Cart.hasMany(cartItemDefinition, { foreignKey: "cartID", onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    return Cart;
}
exports.default = Cart;
