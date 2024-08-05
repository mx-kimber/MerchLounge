import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductShow from './ProductShow';
import ProductUpdate from './ProductUpdate';
import Modal from './Modal';
import ImageUploader from './ImageUploader';

export function SellerDashboardProductShow({ product, onProductUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    if (!product) {
      setIsEditing(false);
    }
  }, [product]);

  const handleProductUpdateClick = () => {
    setIsEditing(true);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setIsEditing(false);
    onProductUpdate(updatedProduct);
  };

  const handleCancelUpdate = () => {
    setIsEditing(false);
  };

  const handleOpenImageUploader = () => {
    setModalContent(<ImageUploader productId={product.id} />);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  if (!product) {
    return <div>No product available.</div>;
  }

  return (
    <div className='container-col'>
      <div className='user-show-container height-100'>
        {isEditing ? (
          <ProductUpdate 
            product={product} 
            onUpdateProduct={handleUpdateProduct} 
            onCancel={handleCancelUpdate}
          />
        ) : (
          <ProductShow product={product} />
        )}
      </div>
      <div className='container-row'>
        <button onClick={handleProductUpdateClick}>Edit Product</button>
        <button onClick={handleOpenImageUploader}>Edit Images</button>
      </div>
      <Modal show={modalVisible} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

export default SellerDashboardProductShow;
