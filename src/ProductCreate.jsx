import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

export function ProductCreate({ onCreateProduct }) {
  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser) {
      axios.get(`http://localhost:3000/shops.json?user_id=${currentUser.id}`)
        .then((response) => {
          setShops(response.data);
        })
        .catch((error) => {
          console.error('Error fetching shops:', error);
        });
    }
  }, [currentUser]);

  const handleProductCreate = (params, successCallback) => {
    axios.post("http://localhost:3000/products.json", params)
      .then((response) => {
        setProducts([...products, response.data]);
        successCallback();
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error creating product:', error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const params = Object.fromEntries(formData.entries());
    params.shop_ids = [params.shop_id]; 
    delete params.shop_id;
    handleProductCreate(params, () => event.target.reset());
  };

  return (
    <div className='container-col align-center'>
      <h1>New Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="container-col align-right">
          <div>
            Shop:
            <select name="shop_id">
              <option value="">Select a shop</option>
              {shops.map((shop) => (
                <option key={shop.id} value={shop.id}>
                  {shop.shop_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            Product Name: <input name="product_name" type="text" required />
          </div>
          <div>
            Description: <input name="description" type="text" required />
          </div>
          <div>
            Price: <input name="price" type="number" step="0.01" required />
          </div>
          <div>
            Quantity: <input name="quantity" type="number" required />
          </div>
          <div className='container-col'>
            <button className="button" type="submit">Create Product</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductCreate;
