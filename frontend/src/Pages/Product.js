import React, { useContext, useState, useEffect } from 'react';
// Import the context for accessing shop data
import { ShopContext } from '../Context/ShopContext';
// Hook for accessing URL parameters
import { useParams } from 'react-router-dom';
// Component for navigation breadcrumbs
import Breadcrum from '../Components/Breadcrums/Breadcrum';
// Component to display the main product
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
// Component for additional product description
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
// Component for showing related products
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
  // Accessing all products from ShopContext
  const {getEnrichedProductById} = useContext(ShopContext);
  // Get the current product ID from URL
  const {productId} = useParams();
  // Find the specific product using its ID
  const [product, setProduct] = useState({})

  // Fetch the product details using the product ID
  useEffect(()=>{
    getEnrichedProductById(productId).then((product) => {
      setProduct(product);
    });
  }, [productId, getEnrichedProductById])

  return (
    <div>
      {/* Display breadcrumb navigation for the product */}
      <Breadcrum product={product}/>
      {/* Main display component for the product */}
      <ProductDisplay product={product}/>
      {/* Component showing detailed description of the product */}
      <DescriptionBox productId={productId}/>
      {/* Component showing products related to the current one */}
      <RelatedProducts/>
    </div>
  );
};

// Export the Product component for use in other parts of the application
export default Product;
