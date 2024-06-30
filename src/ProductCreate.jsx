import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import ShopsModal from './ShopsModal';

export function ProductCreate({ onCreateProduct }) {
  const [products, setProducts] = useState([]);
  const [selectedShops, setSelectedShops] = useState([]);
  const { currentUser } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    params.shop_ids = selectedShops; 
    handleProductCreate(params, () => event.target.reset());
  };

  const handleSelectShops = (shops) => {
    setSelectedShops(shops);
    setIsModalOpen(false);
  };

  return (
    <div className='container-col align-center'>
      <h1>New Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="container-col align-right">
          <div>
            <button type="button" onClick={() => setIsModalOpen(true)}>
              Select Shops
            </button>
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
      {isModalOpen && <ShopsModal onSelectShops={handleSelectShops} />}
    </div>
  );
}

export default ProductCreate;
