import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext'; // Assuming you have a UserContext providing currentUser

export function ProductIndex() {
  const [products, setProducts] = useState([]);
  const { currentUser } = useContext(UserContext); // Get the current user from context

  const handleIndexProducts = () => {
    if (currentUser) {
      console.log("handleIndexProducts");
      axios.get(`http://localhost:3000/products.json?user_id=${currentUser.id}`).then((response) => {
        console.log(response.data);
        setProducts(response.data);
      }).catch((error) => {
        console.error('Error fetching products:', error);
      });
    }
  };

  useEffect(handleIndexProducts, [currentUser]);

  return (
    <div>
      {/* <h2>Product Index</h2> */}
      <div className="container-col">
        {products.map((product) => (
          <div key={product.id} className='container-row space-between'>
            <div>
              <img src={product.product_images} alt={product.product_name} />
            </div>
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
