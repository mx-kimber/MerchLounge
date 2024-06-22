import React, { useState, useEffect } from 'react';
import './shops.css';
import axios from 'axios';
import { Modal } from './Modal';  // Ensure you have a Modal component
import ShopShow from './ShopShow';  // Ensure you have the ShopShow component

export function ShopsIndex(props) {
  const [shops, setShops] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleIndexShops = () => {
    console.log("handleIndexShops");
    axios.get("http://localhost:3000/shops.json").then((response) => {
      console.log(response.data);
      setShops(response.data);
    });
  };

  useEffect(handleIndexShops, []);

  const handleShopShowModal = (shop) => {
    setModalContent(<ShopShow shop={shop} />);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  return (
    <div className='container-col'>
      <div className='container-row width-100 '>      
        {shops.map((shop) => (
          <div key={shop.id} className='shop-item' onClick={() => handleShopShowModal(shop)} style={{ cursor: 'pointer' }}>
            <img src={shop.image} alt={shop.shop_name} />
            {/* <div>{shop.shop_name}</div> */}
            {/* <p>{shop.description}</p> */}
          </div>
        ))}
      </div>
      
      <Modal show={modalVisible} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

export default ShopsIndex;

