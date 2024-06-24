import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const ProductIndex = ({ onProductClick }) => {
  const [products, setProducts] = useState([]);
  const { currentUser } = useContext(UserContext);
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

  return (
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
            <div>Quantity: {product.quantity}</div>
            <div>${product.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductIndex;
