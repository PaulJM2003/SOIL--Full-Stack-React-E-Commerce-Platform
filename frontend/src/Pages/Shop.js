import React from 'react';
// Import specific shop-related components
import Soil from '../Components/Soil/Soil';
import Content from '../Components/Content/Content';
import NewsLetter from '../Components/NewsLetter/NewsLetter';

const Shop = () => {
  return (
    <div>
      {/* Soil component for soil-related information or displays */}
      <Soil/>
      {/* Content component typically used for displaying main shop content */}
      <Content/>
      {/* Newsletter component for signing up to the shop newsletter */}
      <NewsLetter/>
    </div>
  );
}

// Export the Shop component for broader application use
export default Shop;
