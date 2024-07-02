import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { Modal } from './Modal';
import ProductCreate from './ProductCreate';

export function ProductIndex({ products, onProductClick, onProductsLoaded }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const navigate = useNavigate();
  
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchProducts = async () => {
      if (currentUser && products.length === 0) {
        try {
          const response = await axios.get(`http://localhost:3000/products.json?user_id=${currentUser.id}`);
          const fetchedProducts = response.data;
          onProductsLoaded(fetchedProducts);
          
          if (fetchedProducts.length > 0) {
            onProductClick(fetchedProducts[0]);
          } else {
            console.log("You have no products");
          }
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      }
    };
  
    fetchProducts();
  }, [currentUser]); 

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  const handleAddProductModal = () => {
    setModalVisible(true);
    setModalContent(<ProductCreate />);
  };

  const handleProductCheckboxChange = (productId) => {
    setSelectedProductIds(prevSelected =>
      prevSelected.includes(productId)
        ? prevSelected.filter(id => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handleSelectAllChange = () => {
    setSelectAllChecked(!selectAllChecked);
    setSelectedProductIds(!selectAllChecked ? products.map(product => product.id) : []);
  };

  const handleDeleteCheckedProducts = () => {
    setModalVisible(true);
    setModalContent(
      <div>
        <p>Are you sure you want to delete the selected products?</p>
        <div>
          <button onClick={handleConfirmDelete}>Delete</button>
          <button onClick={handleCloseModal}>Cancel</button>
        </div>
      </div>
    );
  };

  const handleConfirmDelete = async () => {
    try {
      await Promise.all(
        selectedProductIds.map(productId =>
          axios.delete(`http://localhost:3000/products/${productId}.json`)
        )
      );
      const updatedProducts = products.filter(product => !selectedProductIds.includes(product.id));
      onProductsLoaded(updatedProducts);
      setSelectedProductIds([]);
      setModalVisible(false);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting products:', error);
    }
  };

  return (
    <div className='container-col'>
      <div className='container-row'>
        <button onClick={handleAddProductModal}>Add a product</button>
        <button onClick={handleDeleteCheckedProducts} disabled={selectedProductIds.length === 0}>
          Delete All Checked
        </button>
      </div>
      <div className='container-col'>
        <div className='user-show-container scroll'>
          <div className='container-row'>
            <div>
              <input type="checkbox" checked={selectAllChecked} onChange={handleSelectAllChange} /> Select All
            </div>
          </div>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className='container-row pointer' onClick={() => onProductClick(product)}>
                <div className='container-row space-between user-show-container'>
                  <div>
                    <input
                      type="checkbox"
                      checked={selectedProductIds.includes(product.id)}
                      onChange={() => handleProductCheckboxChange(product.id)}
                    />
                  </div>
                  <div>
                    {product.product_images && product.product_images.length > 0 ? (
                      <img
                        src={product.product_images[0].image_url}
                        alt={product.product_name}
                        style={{ width: '50px', height: '50px' }}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </div>
                  <div>
                    {product.product_name}
                  </div>
                  <div>
                    {product.quantity}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No products available.</div>
          )}
        </div>
        <Modal show={modalVisible} onClose={handleCloseModal}>
          {modalContent}
        </Modal>
      </div>
    </div>
  );
}

export default ProductIndex;
