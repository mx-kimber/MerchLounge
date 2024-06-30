import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

export function ShopsModal({ onSelectShops }) {
  const [shops, setShops] = useState([]);
  const [selectedShops, setSelectedShops] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser) {
      axios.get(`http://localhost:3000/shops.json?user_id=${currentUser.id}`)
        .then((response) => {
          setShops(response.data);
        })
        .catch((error) => {
          console.error('Error fetching shops:', error);
        });
    }
  }, [currentUser]);

  const handleCheckboxChange = (event) => {
    const shopId = parseInt(event.target.value);
    if (event.target.checked) {
      setSelectedShops([...selectedShops, shopId]);
    } else {
      setSelectedShops(selectedShops.filter(id => id !== shopId));
    }
  };

  const handleConfirm = () => {
    onSelectShops(selectedShops);
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2>Select Shops</h2>
        <div className='shop-list'>
          {shops.map((shop) => (
            <div key={shop.id}>
              <label>
                <input
                  type="checkbox"
                  value={shop.id}
                  onChange={handleCheckboxChange}
                />
                {shop.shop_name}
              </label>
            </div>
          ))}
        </div>
        <button onClick={handleConfirm}>Confirm</button>
      </div>
    </div>
  );
}

export default ShopsModal;
