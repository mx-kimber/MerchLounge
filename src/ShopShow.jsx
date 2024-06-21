import React from 'react';
import { useNavigate } from 'react-router-dom';

export function ShopShow({ shop }) {
  const navigate = useNavigate();

  const navigateToShop = () => {
    navigate(`/shops/${shop.shop_name}`);
  };

  return (
    <div className='container-col align-center'>
      <h1>Shop Information</h1>
      
        <div className='container-row'>
          <div className='container-col align-right'>
        <div className='shop-item'>
          <img src={shop.image} alt={shop.shop_name} />
        </div></div>
        <div className='container-col'>
          <div>{shop.shop_name}</div>
          <div>{shop.description}</div>
        </div>
      </div>
      
      <button onClick={navigateToShop}>Go to Shop</button>
    </div>
  );
}

export default ShopShow;
