import React from 'react';
import { useState, useEffect } from 'react';
import './shops.css';
import axios from 'axios';

export function ShopsIndex(props) {

  const [shops, setShops] = useState([]);

  const handleIndexShops = () => {
    console.log("handleIndexShops");
    axios.get("http://localhost:3000/shops.json").then((response) => {
      console.log(response.data);
      setShops(response.data);
    });
  };

  useEffect(handleIndexShops, []);

  return (
    <div className='#'>
      <h1>All shops</h1>

      <div className='shops-container'>
        
          {shops.map((shop) => (
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
