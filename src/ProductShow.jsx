import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductShow = ({ product }) => {
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/product_images.json?product_id=${product.id}`);
        setProductImages(response.data.resources);
      } catch (error) {
        console.error("There was an error fetching the product images!", error);
      }
    };

    if (product) {
      fetchProductImages();
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className='grid'>
      <div className='container-col align-left'>
        <div>
          {productImages.length > 0 ? (
            productImages.map((image) => (
              <img key={image.public_id} src={image.url} alt={`Product ${product.product_name}`} style={{ width: '100px', height: '100px' }} />
            ))
          ) : (
            <span>No Image</span>
          )}
        </div>
      </div>
      <div className='container-col align-right'>
        <h2>{product.product_name}</h2>
        <p>Quantity: {product.quantity}</p>
        <p>Price: ${product.price}</p>
        <p>Description: {product.description}</p>

        {product.shops && product.shops.length > 0 && (
          <div>
            <strong>Shops:</strong>
            <ul>
              {product.shops.map((shop) => (
                <li key={shop.id}>{shop.shop_name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductShow;
