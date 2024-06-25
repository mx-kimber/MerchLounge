import React, { useState } from 'react';
import axios from 'axios';
import { Modal } from './Modal';

export function ProductUpdate({ product, onUpdateProduct }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleProductUpdate = (id, params, successCallback) => {
    axios.patch(`http://localhost:3000/products/${id}.json`, params)
      .then((response) => {
        onUpdateProduct(response.data);
        successCallback();
        window.location.reload();
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const params = Object.fromEntries(formData.entries());
    handleProductUpdate(product.id, params, () => event.target.reset());
  };

  return (
    <div className='container-col align-center'>
      <h1>Update Product</h1>
      <div className='container-col align-center'>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input id="name" defaultValue={product?.product_name || ''} name="name" type="text" required />
          </div>
          {/* <div>
            <label htmlFor="image">Image:</label>
            <input id="image" defaultValue={product?.images || ''} name="image" type="text" required />
          </div> */}
          <div>
            <label htmlFor="description">Description:</label>
            <input id="description" defaultValue={product?.description || ''} name="description" type="text" required />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input id="price" defaultValue={product?.price || ''} name="price" type="number" step="0.01" required />
          </div>
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input id="quantity" defaultValue={product?.quantity || ''} name="quantity" type="number" required />
          </div>
          <div>
            <button className="button" type="submit">Update Product</button>
          </div>
        </form>
      </div>
      <Modal show={modalVisible} onClose={() => setModalVisible(false)}>
        {modalContent}
      </Modal>
    </div>
  );
}

export default ProductUpdate;
