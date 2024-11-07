import React from 'react';
import './RelatedProducts.css';
import data_product from '../Assets/data';
import Item from '../Item/Item';

const RelatedProducts = () => {
  // Filter and log specials
  const specials = data_product.filter(item => item.isSpecial);
  console.log("Filtered specials:", specials);

  return (
    <div className='relatedproducts'>
      <h1>SPECIALS FOR THE WEEK :</h1>
      <hr />
      <div className="relatedproducts-item">
        {specials.length > 0 ? (
          specials.map((item, i) => (
            <Item 
              key={i} 
              productID={item.id} 
              name={item.name} 
              image={item.image} 
              new_price={item.new_price} 
            />
          ))
        ) : (
          <p>No specials available for this week.</p>
        )}
      </div>
    </div>
  );
}

export default RelatedProducts;
