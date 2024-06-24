import React from 'react';
import ProductShow from './ProductShow';

const SellerDashboardProductShow = ({ product, onClose }) => {
  return (
    <div className='user-show-container'>
      {product ? <ProductShow product={product} onClose={onClose} /> : <p>Select a product to see details</p>}
    </div>
  );
};

export default SellerDashboardProductShow;
