import React, { useContext, useEffect } from 'react';
import { UserContext } from './UserContext';

export function UserShow() {
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    console.log('Current User:', currentUser);
  }, [currentUser]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className='#'>
      <h1>Account Info</h1>
      <p>First Name: {currentUser.first_name}</p>
      <p>Last Name: {currentUser.last_name}</p>
      <p>Phone Number: {currentUser.phone_number}</p>
      <p>Email: {currentUser.email}</p>
      <p>Seller: {currentUser.seller ? "Yes" : "No"}</p>
    </div>
  );
}

export default UserShow;