import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div>
      <h2>All Products</h2>
      {products.length > 0 ? (
        <div>
          {products.map(product => (
            <div key={product.id}>
              <h3>{product.product_name}</h3>
              {product.product_images && product.product_images.length > 0 ? (
                <img src={product.product_images[0].image_url} alt={product.product_name} style={{ width: '100px', height: '100px' }} />
              ) : (
                <span>No Image</span>
              )}
              <p>Price: ${product.price}</p>
              <p>Description: {product.description}</p>
              <p>Quantity: {product.quantity}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}

export default AllProducts;
