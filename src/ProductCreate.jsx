import React, { useState } from 'react';
import axios from 'axios';

export function ProductCreate({ onCreateProduct }) {
  const [products, setProducts] = useState([]);

  const handleProductCreate = (params, successCallback) => {
    console.log("handleCreateProduct", params);
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
    handleProductCreate(params, () => event.target.reset());
  };

  return (
    <div className='container-col align-center'>
      <h1>New Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="container-col align-right">
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
          {/* <div>
            Image URL: <input name="image_url" type="text" required />
          </div> */}
          <div className='container-col'>
            <button className="button" type="submit">Create Product</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductCreate;
