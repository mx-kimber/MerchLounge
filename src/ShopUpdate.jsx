import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Modal } from './Modal';
import { ShopDelete } from './ShopDelete';
import { UserContext } from './UserContext';

export function ShopUpdate({ shop, onUpdateShop }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleShopDeletion = () => {
    setModalContent(<ShopDelete shopId={shop.id} onDeleteSuccess={() => setModalVisible(false)} />);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  const handleUpdateShop = (id, params, successCallback) => {
    console.log("handleUpdateShop", params);
    axios.patch(`http://localhost:3000/shops/${id}.json`, params)
      .then((response) => {
        onUpdateShop(response.data);
        successCallback();
        window.location.href = "/account_settings";
      })
      .catch(error => {
        console.error('Error updating shop:', error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const params = Object.fromEntries(formData.entries());
    handleUpdateShop(shop.id, params, () => event.target.reset());
  };

  return (
    <div className='container-col'>
      <h1>Update Shop</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input defaultValue={shop.shop_name} name="shop_name" type="text" required />
        </div>
        <div>
          Logo/Image: <input defaultValue={shop.image} name="image" type="text" required />
        </div>
        <div>
          Description: <input defaultValue={shop.description} name="description" type="text" required />
        </div>
        <button type="submit">Update Shop</button>
      </form>
      <div>
        <button onClick={handleShopDeletion}>Remove shop</button>
      </div>
      <Modal show={modalVisible} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

export default ShopUpdate;
