import React, { useState } from 'react';
import ProductShow from './ProductShow';
import ProductUpdate from './ProductUpdate';
import { Modal } from './Modal';

export function SellerDashboardProductShow({ product, onClose }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleProductUpdateClick = () => {
    setModalContent(
      <ProductUpdate 
        product={product} 
        onUpdateProduct={(updatedProduct) => {
          setModalVisible(false);
          setModalContent(null);
          console.log('Product updated:', updatedProduct);
   
        }} 
      />
    );
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  return (
    <div className='user-show-container'>
      {product ? (
        <>
          <ProductShow product={product} onClose={onClose} />
          <button onClick={handleProductUpdateClick}>Update Product</button>
        </>
      ) : (
        <p>Select a product to see details</p>
      )}
      <Modal show={modalVisible} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

export default SellerDashboardProductShow;
