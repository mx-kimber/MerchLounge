import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';

export function AccountDelete() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const handleDestroyAccount = () => {
    console.log("handleDestroyAccount", currentUser);
    axios.delete(`http://localhost:3000/users/${currentUser.id}.json`)
      .then((response) => {
        setCurrentUser(null);
        window.location.href = "/merchlounge"; 
      })
      .catch(error => {
        console.error("There was an error deleting the account!", error);
      });
  };

  return (
    <div className='container'>
      <div>
        This will permanently delete your account. Do you wish to proceed?
      </div>
      <button onClick={handleDestroyAccount}>Yes, delete my account.</button> 
    </div>
  )
}

export default AccountDelete;
