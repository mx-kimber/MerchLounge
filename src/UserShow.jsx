import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import UserUpdate from './UserUpdate';
import { Modal } from './Modal';
// import AccountDelete from './AccountDelete';
import ChangePassword from './ChangePassword';

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

  // const handleAccountDelete = () => {
  //   setModalVisible(true);
  //   setModalContent(<AccountDelete />);
  // }
  
  // const handleSellerDashboard = () => {
  //   setModalVisible(true);
  //   setModalContent(<AccountDelete />);
  // }

  const handleChangePassword = () => {
    setModalVisible(true);
    setModalContent(<ChangePassword />);
  }

  return (
    <div className='inner-container'>
    <h2>Account Info</h2>
    <div>
      {currentUser && (
      <>
        <div>{`${currentUser.first_name} ${currentUser.last_name}`}</div>
        <div>{currentUser.phone_number}</div>
        <div>{currentUser.email}</div>
      </>
    )}
    </div>
    <div className='container-col'>
      <div>
        <button onClick={handleUpdateModal}>Update Info</button>
      </div>
      <div>
        <button onClick={handleChangePassword}>Password Settings</button>
      </div>
    </div>
    <Modal show={modalVisible} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
</div>
  );
}

export default UserShow;