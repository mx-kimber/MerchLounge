import React, { useState } from 'react';
import UsersShopsIndex from './UsersShopsIndex';
import ProductIndex from './ProductIndex';
import SellerDashboardProductShow from './SellerDashboardProductShow';
import ProductImages from './ProductImages';

export function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductsLoaded = (loadedProducts) => {
    setProducts(loadedProducts);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleProductUpdate = (updatedProduct) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setSelectedProduct(updatedProduct);
  };

  return (
    <div className='container-col'>
    <div className='container-col padding-10'>
      <h2>Products</h2><div className='container-row grid'>
      <ProductIndex 
        products={products} 
        onProductClick={handleProductClick} 
        onProductsLoaded={handleProductsLoaded} 
      />
      <SellerDashboardProductShow 
        product={selectedProduct} 
        onProductUpdate={handleProductUpdate} 
      />
    </div></div>
    <div>
    <UsersShopsIndex />
  </div>
  {/* <ProductImages /> */}
  </div>
  );
}

export default SellerDashboard;
