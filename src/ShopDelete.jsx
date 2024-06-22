import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';

export function ShopDelete({ shopId, onDeleteSuccess }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const handleDestroyShop = () => {
    console.log("handleDestroyShop", shopId);
    axios.delete(`http://localhost:3000/shops/${shopId}.json`)
      .then((response) => {
       
        const updatedShops = currentUser.shops.filter(shop => shop.id !== shopId);
        setCurrentUser({ ...currentUser, shops: updatedShops });
        
        if (onDeleteSuccess) {
          onDeleteSuccess();
        }
        window.location.href = "/account_settings"; 
      })
      .catch(error => {
        console.error("There was an error deleting the shop!", error);
      });
  };

  return (
    <div className='container'>
      <div>
        This will permanently delete this shop. Do you wish to proceed?
      </div>
      <div className='container-col'>
          <button onClick={handleDestroyShop}>Yes, delete this shop.</button> 
      </div>
    </div>
  );
}

export default ShopDelete;

