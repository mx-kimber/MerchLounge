import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { Modal } from './Modal';
import ProductCreate from './ProductCreate';

export function ProductIndex({ products, onProductClick, onProductsLoaded }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser && products.length === 0) {
      axios.get(`http://localhost:3000/products.json?user_id=${currentUser.id}`)
        .then((response) => {
          onProductsLoaded(response.data);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
        });
    }
  }, [currentUser, products, onProductsLoaded]);

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  const handleAddProductModal = () => {
    setModalVisible(true);
    setModalContent(<ProductCreate />);
  };

  return (
    <div className='container-col'>
      <div className='container-row justify-bottom'>
        <button onClick={handleAddProductModal}>Add a product</button>
      </div>
      <div className='container-col'>
        <div className='user-show-container'>
          {products.map((product) => (
            <div key={product.id} className='container-row' onClick={() => onProductClick(product)}>
              <div className='container-row space-between user-show-container'>
                <div>
                  <img src={product.product_images} alt={product.product_name} />
                </div>
                <div>
                  {product.product_name}
                </div>
                <div>
                  {product.quantity}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Modal show={modalVisible} onClose={handleCloseModal}>
          {modalContent}
        </Modal>
      </div>
    </div>
  );
}

export default ProductIndex;
