// ProductShow.jsx

import React from 'react';

const ProductShow = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={onClose}>&times;</span>
        <h2>{product.product_name}</h2>
        <img src={product.product_images} alt={product.product_name} />
        <p>Price: ${product.price}</p>
        <p>Description: {product.description}</p>
        <p>Quantity: {product.quantity}</p>
      </div>
    </div>
  );
};

export default ProductShow;
