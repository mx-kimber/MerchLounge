import React from 'react';

const ProductShow = ({ product, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <div>
          <img src={product.product_images} alt={product.product_name} />
        </div>
        <div>
          <h2>{product.product_name}</h2>
          <p>Description: {product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Quantity: {product.quantity}</p>
          
        </div>
      </div>
    </div>
  );
};

export default ProductShow;
