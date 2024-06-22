import React, { useState, useEffect } from 'react';
import axios from 'axios';


export function ProductIndex() {
  const [products, setProducts] = useState([]);

  const handleIndexProducts = () => {
    console.log("handleIndexProducts");
    axios.get("http://localhost:3000/products.json").then((response) => {
      console.log(response.data);
      setProducts(response.data);
    });
  };

  useEffect(handleIndexProducts, []);

  return (
    <div>
      <h2>Product Index</h2>
      <div className="container-col">
        {products.map((product) => (
          <div key={product.id} className='container-row space-between'>
            {/* <div>
              <img src={product.product_images} alt={product.product_name} />
            </div> */}
            <div>
              {product.product_name}
            </div>
            {/* <p>{product.description}</p> */}
            <div>Quantity: {product.quantity}</div>
            <div>{product.price}</div>
          
            {/* <p>User ID: {product.user_id}</p> */}
            
            {/* <div className="shops">
              <h3>Shops</h3>
              {product.shops.map((shop) => (
                <p key={shop.id}>{shop.shop_name}</p>
              ))}
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductIndex;
