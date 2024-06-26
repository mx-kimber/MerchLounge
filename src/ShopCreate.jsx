import React, { useState } from 'react';
import axios from 'axios';

export function ShopCreate({ onCreateShop }) {
  const [shops, setShops] = useState([]);

  const handleShopCreate = (params, successCallback) => {
    console.log("handleCreateShop", params);
    axios.post("http://localhost:3000/shops.json", params)
      .then((response) => {
        setShops([...shops, response.data]);
        successCallback();
        window.location.reload()
      })
      .catch((error) => {
        console.error('Error creating shop:', error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const params = Object.fromEntries(formData.entries());
    handleShopCreate(params, () => event.target.reset());
  };

  return (
    <div className='container-col align-center'>
      <h1>New Shop</h1>
      <form onSubmit={handleSubmit}>
      <div className="container-col align-right">
        <div>
          Shop Name: <input name="shop_name" type="text" required />
        </div>
        <div>
          Description: <input name="description" type="text" required />
        </div>
        <div>
          Logo/Image: <input name="image" type="text" required />
        </div>
        
          <div className='container-col'>
            <button className="button" type="submit">Create Shop</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ShopCreate;
