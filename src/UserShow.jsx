import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import UserUpdate from './UserUpdate';
import { Modal } from './Modal';
import AccountDelete from './AccountDelete';

export function UserShow() {
  const { currentUser } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  
  useEffect(() => {
    console.log('Current User:', currentUser);
  }, [currentUser]);

  if (!currentUser) {
    return <div>Loading...</div>;

  }  
  const handleUpdateModal= () => {
    setModalContent(<UserUpdate />);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  const handleAccountDelete = () => {
    setModalVisible(true);
    setModalContent(<AccountDelete />);
  }
  

  return (
    <div className='container-col'>
      <h3>Account Info</h3>
      <div>First Name: {currentUser.first_name}</div>
      <div>Last Name: {currentUser.last_name}</div>
      <div>Phone Number: {currentUser.phone_number}</div>
      <div>Email: {currentUser.email}</div>
      <div>Seller: {currentUser.seller ? "Yes" : "No"}</div>
      <button onClick={handleUpdateModal}>Update Info</button>
      <button onClick={handleAccountDelete}>Delete Account</button>
    <Modal show={modalVisible} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
    
</div>
  );
}

export default UserShow;