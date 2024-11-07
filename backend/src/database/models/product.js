"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Product(sequalize, dataTypes) {
    /**
     * Product model stub.
     * TODO: Update.
     */
    var ProductDef = sequalize.define('Product', {
        productID: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        description: {
            type: dataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        category: {
            type: dataTypes.STRING,
            allowNull: false
        },
        price: {
            type: dataTypes.FLOAT,
            allowNull: false
        },
        stock: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        isFeatured: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    }, {
        tableName: "product",
        timestamps: true,
    });
    //Product.hasMany(reviewDefinition, {foreignKey: 'productID', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    //reviewDefinition.belongsTo(Product, {foreignKey: 'productID'});
    return ProductDef;
}
exports.default = Product;
