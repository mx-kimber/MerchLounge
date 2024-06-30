import React from 'react';

const ProductShow = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className='grid'>
      <div className='container-col align-left'>
        {/* <span className='close' onClick={onClose}>&times;</span> */}
        <img src={product.product_images} alt={product.product_name} />
      </div>
      <div className='container-col align-right'>
        <h2>{product.product_name}</h2>
        <p>Quantity: {product.quantity}</p>
        <p>Price: ${product.price}</p>
        <p>Description: {product.description}</p>

        {product.shops && product.shops.length > 0 && (
          <div>
            <strong>Shops:</strong>
            <ul>
              {product.shops.map((shop) => (
                <li key={shop.id}>{shop.shop_name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductShow;
