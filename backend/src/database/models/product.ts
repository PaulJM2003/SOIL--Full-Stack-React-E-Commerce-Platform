import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { ProductImageModel } from "./productImage";

export interface ProductModel extends Model<InferAttributes<ProductModel>, InferCreationAttributes<ProductModel>>  {
    productID: CreationOptional<number>;
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    isFeatured: boolean;
    ProductImages?: ProductImageModel[];
}

export default function Product(sequalize: Sequelize, dataTypes: typeof DataTypes){

    /**
     * Product model stub.
     * TODO: Update.
     */

    const ProductDef = sequalize.define<ProductModel>('Product', 
        {
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
        }, 
        {

            tableName: "product",

            timestamps: true, 

        }
    );

    //Product.hasMany(reviewDefinition, {foreignKey: 'productID', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    //reviewDefinition.belongsTo(Product, {foreignKey: 'productID'});

    return ProductDef;

}

export type ProductDefinition = ReturnType<typeof Product>;