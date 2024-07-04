import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductShow from './ProductShow';
import ProductUpdate from './ProductUpdate';
import Modal from './Modal';
import ImageUploader from './ImageUploader';

export function SellerDashboardProductShow({ product, onProductUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [productImages, setProductImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${product.id}/product_images.json`);
        setProductImages(response.data);
      } catch (error) {
        console.error("There was an error fetching the product images!", error);
      }
    };

    if (product) {
      fetchProductImages();
    }
  }, [product]);

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
    setModalContent(<ImageUploader product_id={product.id} onImageUpload={handleImageUpload} />);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  const handleImageUpload = (imageData) => {
    console.log("Uploaded image data:", imageData);
    setModalVisible(false);
    fetchProductImages();
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
          <>
            <ProductShow product={product} />
            <div>
              {productImages.length > 0 ? (
                productImages.map((image) => (
                  <img key={image.id} src={image.image_url} alt={`Product ${product.product_name}`} />
                ))
              ) : (
                <p>No product images available.</p>
              )}
            </div>
          </>
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
