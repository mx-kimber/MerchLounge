import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { Modal } from './Modal';
import ProductCreate from './ProductCreate';

export function ProductIndex({ onProductClick, onProductsLoaded }) {
  const [products, setProducts] = useState([]);
  const { currentUser } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      console.log("handleIndexProducts");
      axios.get(`http://localhost:3000/products.json?user_id=${currentUser.id}`)
        .then((response) => {
          console.log(response.data);
          setProducts(response.data);
          if (onProductsLoaded) {
            onProductsLoaded(response.data);
          }
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
        });
    }
  }, [currentUser]);

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
      <div className='container-col '>
        <div className='user-show-container'>
          {products.map((product) => (
            <div key={product.id} className='container-row' onClick={() => onProductClick(product)}>
              <div className='container-row space-between user-show-container '>
              
                <div className=''>
                  <img src={product.product_images} alt={product.product_name} />
                </div>
                <div className=''>
                  {product.product_name}
                </div>
                <div className=''>
                  {product.quantity}
                </div>
              </div>
            </div>
          ))}
          
          
        </div>
        <div className='container-row justify-bottom'>
          <button onClick={handleAddProductModal}>Add a product</button>
        </div>
        
        
        <Modal show={modalVisible} onClose={handleCloseModal}>
            {modalContent}
          </Modal>
    </div></div>
  );
};

export default ProductIndex;
