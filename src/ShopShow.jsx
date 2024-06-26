import React from 'react';
import { useNavigate } from 'react-router-dom';

export function ShopShow({ shop }) {
  const navigate = useNavigate();

  const navigateToShop = () => {
    navigate(`/shops/${shop.shop_name}`);
  };

  return (
    <div className=''>
      
        <div className='container-col'>
          <div className='container-col align-center'>
          <div className='shop-item'>
            <img src={shop.image} alt={shop.shop_name} />
          </div>
        </div>
        <div className='container-col'>
          <div>{shop.shop_name}</div>
          <div>{shop.description}</div>
        </div>
      </div>
      <div className='container-row'>
        <button onClick={navigateToShop}>Go Shop!</button>
      </div>
      
    </div>
  );
}

export default ShopShow;
