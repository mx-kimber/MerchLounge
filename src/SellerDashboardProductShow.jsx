import React, { useState, useEffect } from 'react';
import ProductShow from './ProductShow';
import ProductUpdate from './ProductUpdate';

export function SellerDashboardProductShow({ product, onProductUpdate }) {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!product) {
      setIsEditing(false);
    }
  }, [product]);

  const handleProductUpdateClick = () => {
    setIsEditing(true);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setIsEditing(false);
    onProductUpdate(updatedProduct);
  };

  const handleCancelUpdate = () => {
    setIsEditing(false);
  };

  if (!product) {
    return <div>No product available.</div>;
  }

  return (
    <div className='container-col'>
      <div className='user-show-container height-100'>
        {isEditing ? (
          <ProductUpdate 
            product={product} 
            onUpdateProduct={handleUpdateProduct} 
            onCancel={handleCancelUpdate}
          />
        ) : (
          <>
            <ProductShow product={product} />
            <div>
              <strong>Shops:</strong>
              {product.shops && product.shops.length > 0 ? (
                <ul>
                  {product.shops.map((shop) => (
                    <li key={shop.id}>{shop.shop_name}</li>
                  ))}
                </ul>
              ) : (
                <p>No shops associated</p>
              )}
            </div>
          </>
        )}
      </div>
      <div className='container-row'>
        <button onClick={handleProductUpdateClick}>Update Product</button>
      </div>
    </div>
  );
}

export default SellerDashboardProductShow;
