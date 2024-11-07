import p1_img from './product_1.png'
import p6_img from './product_6.png'
import p9_img from './product_9.png'
import p12_img from './product_12.png'

let data_product = [
  {
    id: 1,
    name: "Cheddar Cheese (-/pound)",
    category: "diarys",
    image: p1_img,
    new_price: 2.50,
    isSpecial: true,
    // old_price: 5.00,
  },
  {
    id: 6,
    name: "Bananas (-/pound)",
    category: "women",
    image: p6_img,
    new_price: 0.50,
    isSpecial: true,
    // old_price: 1.00,
  },
  {
    id: 9,
    name: "Red Bell Pepper (-/each)",
    category: "veg",
    image: p9_img,
    new_price: 0.50,
    isSpecial: true,
    // old_price: 1.50,
  },
  {
    id: 12,
    name: "Spinach (-/bunch)",
    category: "veg",
    image: p12_img,
    new_price: 2.50,
    isSpecial: true,
    // old_price: 4.50,
  },
];

export default data_product;
