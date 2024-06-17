import React from 'react';
import './shops.css';

export function ShopsIndex(props) {
  return (
    <div className='#'>
      <h1>All shops</h1>

      <div className='shops-container'>
        
          {props.shops.map((shop) => (
            <div key={shop.id} className='shop-item'>
              <img src={shop.image} alt={shop.shop_name} />
              {/* <div>{shop.shop_name}
                </div> */}
              {/* <p>{shop.description}</p> */}
            </div>
          ))}


      </div>

    </div>
  );
}

export default ShopsIndex;
