import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductShow from './ProductShow';
import ProductUpdate from './ProductUpdate';

export function SellerDashboardProductShow({ product, onProductUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [productImages, setProductImages] = useState([]);

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
            {/* <div>
              {productImages.length > 0 ? (
                productImages.map((image) => (
                  <img key={image.id} src={image.image_url} alt={`Product ${product.product_name}`} />
                ))
              ) : (
                <p>No product images available.</p>
              )}
            </div> */}
          </>
        )}
      </div>
      <div className='container-row'>
        <button onClick={handleProductUpdateClick}>Edit Product</button>
      </div>
    </div>
  );
}

export default SellerDashboardProductShow;
