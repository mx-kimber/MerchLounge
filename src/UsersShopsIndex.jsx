import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

export function UsersShopsIndex() {
  const [shops, setShops] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    handleIndexUsersShops();
  }, []);

  const handleIndexUsersShops = () => {
    axios.get("http://localhost:3000/shops.json")
      .then((response) => {
        console.log(response.data);
        setShops(response.data);
      })
      .catch((error) => {
        console.error('Error fetching shops:', error);
      });
  };

  return (
    <div className='shops-container-col'>
      <h3>Shops</h3>

      {currentUser && currentUser.shops && (
        currentUser.shops.map(shop => (
         <div key={shop.id} className='#'>
           <div className='user-shops'>
            <div className="user-shops-container">
             
             <img src={shop.image} alt={shop.shop_name} />
            
           <div className='#'>
              {shop.shop_name}
           </div>
            {/* <div>
              {shop.description}
            </div> */}
          </div>
        </div> </div>
        ))
      )}
    </div>
  );
}

export default UsersShopsIndex;