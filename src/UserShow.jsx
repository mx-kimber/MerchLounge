import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import UserUpdate from './UserUpdate';
import { Modal } from './Modal';

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
  

  return (
    <div className='#'>
      <h1>Account Info</h1>
      <p>First Name: {currentUser.first_name}</p>
      <p>Last Name: {currentUser.last_name}</p>
      <p>Phone Number: {currentUser.phone_number}</p>
      <p>Email: {currentUser.email}</p>
      <p>Seller: {currentUser.seller ? "Yes" : "No"}</p>
      <button onClick={handleUpdateModal}>Update Info</button>
      
    <Modal show={modalVisible} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
</div>
  );
}

export default UserShow;