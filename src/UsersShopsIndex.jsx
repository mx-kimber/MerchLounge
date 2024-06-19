import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import { Modal } from './Modal';
import ShopCreate from './ShopCreate';

export function UsersShopsIndex() {
  const [shops, setShops] = useState([]);
  const { currentUser } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    handleIndexUsersShops();
  }, []);

  const handleShopCreateModal= () => {
    setModalContent(<ShopCreate />);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

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
      <div className='#'>
        <h2>Shops</h2>
      <div>
        <button onClick={handleShopCreateModal}>Create new shop</button></div>
      </div>
      {currentUser && currentUser.shops && (
        currentUser.shops.map(shop => (
         <div key={shop.id} className='#'>
           <div className='user-shops'>
           
             
             <img src={shop.image} alt={shop.shop_name} />
            
           <div className='outline'>
              {shop.shop_name}
           </div>
            {/* <div>
              {shop.description}
            </div> */}
          </div>
        </div> 
     
      ))
    )}
  
    <Modal show={modalVisible} onClose={handleCloseModal}>
          {modalContent}
        </Modal></div>
  );
}

export default UsersShopsIndex;
