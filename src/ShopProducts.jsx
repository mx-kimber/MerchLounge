import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function ShopProducts({ shopId }) {
  const [products, setProducts] = useState([]);
  const [shopName, setShopName] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/shops/${shopId}`)
      .then((response) => {
        setShopName(response.data.shop_name);
      })
      .catch((error) => {
        console.error('Error fetching shop details:', error);
      });

    axios.get(`http://localhost:3000/shops/${shopId}/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, [shopId]);

  return (
    <div>
      <h2>Products for {shopName}</h2>
      {products.length > 0 ? (
        <div>
          {products.map(product => (
            <div key={product.id}>{product.product_name}</div>
          ))}
        </div>
      ) : (
        <p>No products found for this shop.</p>
      )}
    </div>
  );
}

export default ShopProducts;
