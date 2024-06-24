import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import ProductShow from './ProductShow';

const ProductIndex = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { currentUser } = useContext(UserContext);

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

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null); 
  };

  return (
    <div>
      {selectedProduct && <ProductShow product={selectedProduct} onClose={handleCloseModal} />}

      <div className="container-col">
        {products.map((product) => (
          <div key={product.id} className='container-row space-between' onClick={() => handleProductClick(product)}>
            <div>
              <img src={product.product_images} alt={product.product_name} />
            </div>
            <div>
              {product.product_name}
            </div>
            <div>Quantity: {product.quantity}</div>
            <div>${product.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductIndex;
