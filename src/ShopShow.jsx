import React from 'react';
import { useNavigate } from 'react-router-dom';

export function ShopShow({ shop }) {
  const navigate = useNavigate();

  const navigateToShop = () => {
    navigate(`/shops/${shop.shop_name}`);
  };

  return (
    <div>
      <h1>Shop Information</h1>
      <div className='shop-item'> <img src={shop.image} alt={shop.shop_name} /></div>
      <p>Name: {shop.shop_name}</p>
      <p>Description: {shop.description}</p>
      <button onClick={navigateToShop}>Go to Shop</button>
    </div>
  );
}

export default ShopShow;
