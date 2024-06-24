import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import { Modal } from './Modal';
import AccountDelete from './AccountDelete';

export function UserUpdate() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    seller: false,
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        phone_number: currentUser.phone_number,
        email: currentUser.email,
        seller: currentUser.seller,
      });
    }
  }, [currentUser]);

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  const handleAccountDelete = () => {
    setModalVisible(true);
    setModalContent(<AccountDelete />);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.patch(`http://localhost:3000/users/${currentUser.id}.json`, formData)
      .then((response) => {
        setCurrentUser(response.data);
        // alert('Account updated successfully!');
        window.location.href = "/account_settings";
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to update account');
      });
  };

  if (!currentUser) {
    return <div>You must be logged in.</div>;
  }

  return (
    <div className='container-col align-center'>
    <h1>Update Account Info</h1>
      <form onSubmit={handleSubmit}>
      <div className='container-col align-right'>
        <div>
          <label>First Name: </label>
          <input
            value={formData.first_name}
            name="first_name"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name: </label>
          <input
            value={formData.last_name}
            name="last_name"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone: </label>
          <input
            value={formData.phone_number}
            name="phone_number"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            value={formData.email}
            name="email"
            type="email"
            onChange={handleChange}
          />
        </div>
      
      <div className='container-col'>
        <div>
          <button onClick={handleSubmit} >Update Account</button>
        </div>
        <div>
          <button onClick={handleAccountDelete}>Delete Account</button>
        </div>
 </div></div>
      </form>
    

      <Modal show={modalVisible} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

export default UserUpdate;
