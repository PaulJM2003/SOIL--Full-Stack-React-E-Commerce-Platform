"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ProductImage(sequalize, dataTypes, productDefinition) {
    var ProductImage = sequalize.define('ProductImage', {
        productImageID: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        image: {
            type: "LONGBLOB",
            allowNull: false,
        }
    }, {
        tableName: "productImage",
    });
    ProductImage.belongsTo(productDefinition, {
        foreignKey: 'productID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    productDefinition.hasMany(ProductImage, { foreignKey: 'productID' });
    return ProductImage;
}
exports.default = ProductImage;
