import React, { useState } from 'react';
import UsersShopsIndex from './UsersShopsIndex';
import ProductIndex from './ProductIndex';
import SellerDashboardProductShow from './SellerDashboardProductShow';

export function SellerDashboard() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleProductsLoaded = (loadedProducts) => {
    setProducts(loadedProducts);
    if (loadedProducts.length > 0) {
      setSelectedProduct(loadedProducts[0]);
    }
  };

  const handleProductUpdate = (updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    setSelectedProduct(updatedProduct);
  };

  return (
    <div className='container-col'>
      <h2>Product Index</h2>
      <div className='container-row grid'>
        <div>
          <ProductIndex
            products={products}
            onProductClick={handleProductClick}
            onProductsLoaded={handleProductsLoaded}
          />
        </div>
        <div>
          <SellerDashboardProductShow
            product={selectedProduct}
            onProductUpdate={handleProductUpdate}
          />
        </div>
      </div>
      <div>
        <UsersShopsIndex />
      </div>
    </div>
  );
}

export default SellerDashboard;
