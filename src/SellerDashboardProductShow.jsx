import React, { useState } from 'react';
import ProductShow from './ProductShow';
import ProductUpdate from './ProductUpdate';

export function SellerDashboardProductShow({ product, onClose }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleProductUpdateClick = () => {
    setIsEditing(true);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setIsEditing(false);
    console.log('Product updated:', updatedProduct);
    window.location.reload()
  };

  const handleCancelUpdate = () => {
    setIsEditing(false);
  };

  return (
    <div className='container-col'>
    <div className='user-show-container'>
      {isEditing ? (
        <ProductUpdate 
          product={product} 
          onUpdateProduct={handleUpdateProduct} 
          onCancel={handleCancelUpdate}
        />
      ) : (
        <>
          {product ? (
            <>
              <ProductShow product={product}/>
              
            </>
          ) : (
            <p>Select a product to see details</p>
          )}
        </>
      )}
      </div>
      <div className='container-row justify-bottom'><button onClick={handleProductUpdateClick}>Update Product</button>
    </div></div>
    
  );
}

export default SellerDashboardProductShow;

