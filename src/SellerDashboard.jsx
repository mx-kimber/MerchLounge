import React, { useState } from 'react';
import UsersShopsIndex from './UsersShopsIndex';
import ProductIndex from './ProductIndex';
import SellerDashboardProductShow from './SellerDashboardProductShow';

export function SellerDashboard() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className='container-col'>
        <h2>Product Index</h2>
      <div className='container-row grid '>
        {/* <div className='container-row'> */}
          <div>
            <ProductIndex onProductClick={handleProductClick} />
          </div>
          <div className=''>
            <SellerDashboardProductShow product={selectedProduct} onClose={handleCloseModal} />
          </div>
        </div>
        <div>
          <UsersShopsIndex />
        </div>
      </div>
    // </div>
  );
}

export default SellerDashboard;
