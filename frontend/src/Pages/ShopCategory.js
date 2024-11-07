import React, { useContext } from 'react';
// Import stylesheet for the ShopCategory component
import './CSS/ShopCategory.css';
// Import ShopContext for access to shop data and functions
import { ShopContext } from '../Context/ShopContext';
// Import dropdown icon for the sorting dropdown
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
// Import Item component to display individual products
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  // Use ShopContext to access products and addToCart function
  const { all_product, addItem } = useContext(ShopContext); 
  console.log(all_product[0])
  return (
    <div className='shop-category'>
      {/* Banner image for the category */}
      <img className='shopcategory-banner' src={props.banner} alt="" />
      {/* Sorting and product count section */}
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-4</span> out of 12 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      {/* List products that match the category from props */}
      <div className="shopcategory-products">
        {all_product.map((item, i) => {
          if (props.category === item.category) {
            return <Item key={i} {...item} addToCart={addItem}/>  
          } else {
            return null;
          }
        })}
      </div>
      {/* Button or section to load more products */}
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  )
}

// Export the ShopCategory component for use in other parts of the app
export default ShopCategory;
