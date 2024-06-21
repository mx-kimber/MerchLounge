import React, { useState, useContext } from 'react';
import { Modal } from './Modal';
import { ShopDelete } from './ShopDelete';
import { UserContext } from './UserContext';

export function ShopUpdate() {
  const [shops, setShops] = useState([]);
  const { currentUser } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleShopDeletion = () => {
    setModalContent(<ShopDelete />);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  return (
    <div className='container-col'>
      <div>Update Shop</div>
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
