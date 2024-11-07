import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { ProductDefinition } from "./product";

export interface ProductImageModel  extends Model<InferAttributes<ProductImageModel>, InferCreationAttributes<ProductImageModel>> {
    productImageID: CreationOptional<number>;
    image: Buffer
    productID?: number;
}

export default function ProductImage(sequalize: Sequelize, dataTypes: typeof DataTypes, productDefinition: ProductDefinition){

    const ProductImage = sequalize.define<ProductImageModel>('ProductImage', 
        {
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
        }, 
        {

            tableName: "productImage",

        }
    );

    ProductImage.belongsTo(productDefinition, {
        foreignKey: 'productID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    productDefinition.hasMany(ProductImage, {foreignKey: 'productID'});


    return ProductImage;

}

export type ProductImageDefinition = ReturnType<typeof ProductImage>;