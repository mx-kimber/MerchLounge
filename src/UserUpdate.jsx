import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

export function UserUpdate() {
  const { currentUser, setCurrentUser } = useContext(UserContext);


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

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.patch(`http://localhost:3000/users/${currentUser.id}.json`, formData)
      .then((response) => {
        setCurrentUser(response.data);
        // alert('Account updated successfully!');
        event.target.reset();
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
    <div className="update-account-info">
      <h1>Update Account Info</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            value={formData.first_name}
            name="first_name"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            value={formData.last_name}
            name="last_name"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            value={formData.phone_number}
            name="phone_number"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            value={formData.email}
            name="email"
            type="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Seller:</label>
          <input
            checked={formData.seller}
            name="seller"
            type="checkbox"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Account</button>
      </form>
    </div>
  );
}

export default UserUpdate;
