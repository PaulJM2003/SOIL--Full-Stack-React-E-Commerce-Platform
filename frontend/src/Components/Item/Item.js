import React, {useEffect, useContext, useState} from 'react'
import './Item.css'
import { ShopContext } from '../../Context/ShopContext';

import { Link } from 'react-router-dom'

import { TextDecoder } from 'text-encoding';

const Item = ({ productID, addToCart }) => {
  const { getEnrichedProductById } = useContext(ShopContext);

  const [productDetails, setProductDetails] = useState({});
  useEffect(() => {
    
    getEnrichedProductById(productID).then((product) => {
      setProductDetails(product);
    }).catch((error) => {
      
      console.log(error);
    })})
    
    // Convert bytes to image
    
  const [productImage, setProductImage] = useState(null);
  useEffect(() => {
    if (productDetails?.ProductImages) {
      const byteArr = productDetails.ProductImages[0].image.data;
      const blob = new Blob([new Uint8Array(byteArr)], {type: 'image/png'});
      const encodedImage = URL.createObjectURL(blob);
      setProductImage(encodedImage);
    }
  }, [productDetails?.ProductImages]);

  if(!productDetails){
    return(<div></div>)
  }

  return (
    <div className='item'>
      <Link to={`/product/${productID}`}>
        <img src={productImage} alt={productDetails.name} />
      </Link>
      <p>{productDetails.name}</p>
      <div className="item-prices">
        <div className="item-price-new">
            ${productDetails.price}
        </div>
        {/* <div className="item-price-old">
            ${old_price}
        </div> */}
      </div>
      <button onClick={() => addToCart(productID)}>Add to Cart</button>  {/* Add to Cart Button */}
    </div>
  )
}

export default Item
