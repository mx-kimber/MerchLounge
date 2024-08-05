import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ShopsModal from './ShopsModal';
import { UserContext } from './UserContext';

export function ProductUpdate({ product, onUpdateProduct, onCancel }) {
  const { currentUser } = useContext(UserContext);
  const [updatedProduct, setUpdatedProduct] = useState({
    product_name: product.product_name,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
  });
  const [selectedShops, setSelectedShops] = useState(product.shops.map(shop => shop.id) || []);
  const [isModalOpen, setIsModalOpen] = useState(false);

useEffect(() => {
  if (product) {
    setUpdatedProduct({
      product_name: product.product_name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
    });
    setSelectedShops(product.shops.map(shop => shop.id) || []);
  }
}, [product]);


  const fetchUserShops = () => {
    axios.get(`http://localhost:3000/shops.json?user_id=${currentUser.id}`)
      .then((response) => {
        setSelectedShops(response.data.map(shop => shop.id));
      })
      .catch((error) => {
        console.error('Error fetching user shops:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({
      ...updatedProduct,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = { ...updatedProduct, shop_ids: selectedShops };

    axios.patch(`http://localhost:3000/products/${product.id}.json`, params)
      .then((response) => {
        onUpdateProduct(response.data);
        console.log('Product updated:', response.data);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  const handleSelectShops = (shops) => {
    setSelectedShops(shops);
    setIsModalOpen(false);
  };

  const handleDeleteProduct = () => {
    axios.delete(`http://localhost:3000/products/${product.id}.json`)
      .then(() => {
        console.log('Product deleted successfully');
        window.location.reload();
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  return (
    <div className='container-col align-center'>
      <h1>Update Product</h1>
      <div className='container-col align-center'>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="product_name">Name:</label>
            <input
              id="product_name"
              value={updatedProduct.product_name}
              name="product_name"
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
            <button type="button" onClick={() => setIsModalOpen(true)}>
              Select Shops
            </button>
            <button type="button" onClick={handleDeleteProduct}>
              Delete Product
            </button>
          </div>
          <div>
            <button className="button" type="submit">Update Product</button>
            <button className="button" type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
      {isModalOpen && <ShopsModal onSelectShops={handleSelectShops} />}
    </div>
  );
}

export default ProductUpdate;
