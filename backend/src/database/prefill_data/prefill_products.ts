import { InferCreationAttributes } from "sequelize";
import { ProductDefinition, ProductModel } from "../models/product";
import { ProductImageDefinition } from "../models/productImage";
import * as fs from "fs"

interface DB {
  product: ProductDefinition
  productImage: ProductImageDefinition
}


let prefill_products: InferCreationAttributes<ProductModel>[] = [
  {
    productID: 1,
    name: "Cheddar Cheese (-/pound)",
    category: "diarys",
    price:2.50,
    description: 'Example description', 
    isFeatured: false, 
    stock: 100,
  
  },
  {
    productID: 2,
    name: "Carton of Milk (1-gallon)",
    category: "diarys",
    price:2.50, 
    description: 'Example description', 
    isFeatured: false, 
    stock: 100,  
  },
  {
    productID: 3,
    name: "Greek Yogurt (20oz)",
    category: "diarys",
    price:3.00, 
    isFeatured: false, 
    stock: 100,
    description: 'Example description',
  },
  {
    productID: 4,
    name: "Brie Cheese (-/pound)",
    category: "diarys",
    price:5.00,
    
    description: 'Example description', 
    isFeatured: false, 
    stock: 100, // 10.00,
  },
  {
    productID: 5,
    name: "Apple (-/pound)",
    category: "fruits",
    price:1.50,
    
    description: 'Example description', 
    isFeatured: false, 
    stock: 100, // 2.50,
  },
  {
    productID: 6,
    name: "Bananas (-/pound)",
    category: "fruits",
    price:0.50,
    
    description: 'Example description', 
    isFeatured: false, 
    stock: 100, // 1.00,
  },
  {
    productID: 7,
    name: "Orange (-/pound)",
    category: "fruits",
    price:1.00,
    
    description: 'Example description', 
    isFeatured: false, 
    stock: 100, // 1.50,
  },
  {
    productID: 8,
    name: "Green Grapes (-/pound)",
    category: "fruits",
    price:2.00,
    
    description: 'Example description', 
    isFeatured: false, 
    stock: 100, // 4.00,
  },
  {
    productID: 9,
    name: "Red Bell Pepper (-/each)",
    category: "veg",
    price:0.50,
    
    description: 'Example description', 
    isFeatured: false, 
    stock: 100, // 1.50,
  },
  {
    productID: 10,
    name: "Broccoli (-/bunch)",
    category: "veg",
    price:1.50,
    
    description: 'Example description', 
    isFeatured: false, 
    stock: 100, // 2.50,
  },
  {
    productID: 11,
    name: "Carrot (-/pound)",
    category: "veg",
    price:0.50,
    
    description: 'Example description', 
    isFeatured: false, 
    stock: 100, // 1.00,
  },
  {
    productID: 12,
    name: "Spinach (-/bunch)",
    category: "veg",
    price:2.50,
    
    description: 'Example description', 
    isFeatured: false, 
    stock: 100, // 4.50,
  },
];

export async function addPrefillProducts<T extends DB>(db: T){
  await db.productImage.destroy({where: {}});
  await db.product.destroy({where: {}});
  for (let product of prefill_products){
    await db.product.create(product);
  }

  console.log('Prefill products added');

  const promiseArr = (await db.product.findAll()).map((product) => { return db.productImage.create({
    image: fs.readFileSync(`src/database/prefill_data/images/product_${product.productID}.png`),
    productID: product.productID
  }) });

  await Promise.all(promiseArr);
  
  console.log('Prefill product images added');
    
  //   .then((product) => { db.productImage.create({
  //   image: fs.readFileSync(`src/database/prefill_data/images/product_${product.productID}.png`),
  //   productID: product.productID
  // }) });

};
