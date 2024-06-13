import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

export function UserUpdate() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    console.log('Current User:', currentUser);
  }, [currentUser]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    axios.patch(`http://localhost:3000/users/${currentUser.id}.json`, params)
      .then((response) => {
        setCurrentUser(response.data);
        alert('Account updated successfully!');
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to update account');
      });
  };

  return (
    <div className="update-account-info">
      <h1>Update Account Info</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input defaultValue={currentUser.first_name} name="first_name" type="text" />
        </div>
        <div>
          <label>Last Name:</label>
          <input defaultValue={currentUser.last_name} name="last_name" type="text" />
        </div>
        <div>
          <label>Phone Number:</label>
          <input defaultValue={currentUser.phone_number} name="phone_number" type="text" />
        </div>
        <div>
          <label>Email:</label>
          <input defaultValue={currentUser.email} name="email" type="email" />
        </div>
        <div>
          <label>Seller:</label>
          <input defaultValue={currentUser.seller} name="seller" type="checkbox" defaultChecked={currentUser.seller} />
        </div>
        <button type="submit">Update Account</button>
      </form>
    </div>
  );
}

export default UserUpdate;
