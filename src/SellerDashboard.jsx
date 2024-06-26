import React, { useState } from 'react';
import UsersShopsIndex from './UsersShopsIndex';
import ProductIndex from './ProductIndex';
import SellerDashboardProductShow from './SellerDashboardProductShow';

export function SellerDashboard() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleProductsLoaded = (products) => {
    if (products.length > 0) {
      setSelectedProduct(products[0]);
    }
  };

  return (
    <div className='container-col'>
      <h2>Product Index</h2>
      <div className='container-row grid'>
        <div>
          <ProductIndex onProductClick={handleProductClick} onProductsLoaded={handleProductsLoaded} />
        </div>
        <div>
          <SellerDashboardProductShow product={selectedProduct} />
        </div>
      </div>
      <div>
        <UsersShopsIndex />
      </div>
    </div>
  );
}

export default SellerDashboard;

