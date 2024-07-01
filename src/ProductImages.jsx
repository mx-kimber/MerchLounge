import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function ProductImages() {
  const [productImageDetails, setProductImageDetails] = useState([]);

  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/product_images.json');
        const images = response.data;

        const productDetailsPromises = images.map(async (image) => {
          const productResponse = await axios.get(`http://localhost:3000/products/${image.product_id}.json`);
          const productName = productResponse.data.product_name;
          return { ...image, product_name: productName };
        });

     
        const productDetails = await Promise.all(productDetailsPromises);

        setProductImageDetails(productDetails);
      } catch (error) {
        console.error("There was an error fetching the product images and details!", error);
      }
    };

    fetchProductImages();
  }, []);

  return (
    <div>
      <h1>Product Images</h1>
      {productImageDetails.length > 0 ? (
        <ul>
          {productImageDetails.map((image) => (
            <li key={image.id}>
              <img src={image.image_url} alt={`Product ${image.product_name}`} style={{ width: '100px', height: '100px' }} />
              <p>Product Name: {image.product_name}</p>
              {/* <p>Created At: {new Date(image.created_at).toLocaleString()}</p>
              <p>Updated At: {new Date(image.updated_at).toLocaleString()}</p> */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No product images available.</p>
      )}
    </div>
  );
}

export default ProductImages;
