import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { Modal } from './Modal';
import ProductCreate from './ProductCreate';

export function ProductIndex ({ onProductClick }) {
  
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
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
        });
    }
  }, [currentUser]);

  const handleNavigateToDashboard = () => {
    navigate('/seller_dashboard');
  };
  const handleCloseModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  const handleAddProductModal = () => {
    setModalVisible(true);
    setModalContent(<ProductCreate />);
  };
  return (
    <div className='container-col gap-10'>
    <div className='user-show-container'>
    

      <div className="container-col ">
        {products.map((product) => (
          <div key={product.id} className='container-row space-between' onClick={() => onProductClick(product)}>
            <div>
              <img src={product.product_images} alt={product.product_name} />
            </div>
            <div>
              {product.product_name}
            </div>
            <div>{product.quantity}</div>
            {/* <div>${product.price}</div> */}
          </div>
        ))}
      </div>
      

      <Modal show={modalVisible} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
    </div>
    <div>
        <button onClick={handleAddProductModal}>Add a product</button>
      </div>
      </div>
  );
  
};

export default ProductIndex;
