import React, { useState } from 'react';
import axios from 'axios';

export function ProductUpdate({ product, onUpdateProduct, onCancel }) {
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.product_name,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({
      ...updatedProduct,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = updatedProduct;

    axios.patch(`http://localhost:3000/products/${product.id}.json`, params)
      .then((response) => {
        onUpdateProduct(response.data);
        console.log('Product updated:', response.data);
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  return (
    <div className='container-col align-center'>
      <h1>Update Product</h1>
      <div className='container-col align-center'>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              value={updatedProduct.name}
              name="name"
              type="text"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <input
              id="description"
              value={updatedProduct.description}
              name="description"
              type="text"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              id="price"
              value={updatedProduct.price}
              name="price"
              type="number"
              step="0.01"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              id="quantity"
              value={updatedProduct.quantity}
              name="quantity"
              type="number"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button className="button" type="submit">Update Product</button>
            <button className="button" type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductUpdate;
