import React from 'react';
import UserShow from './UserShow';
import UsersShopsIndex from './UsersShopsIndex';
import "./AccountSettings.css";
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { useContext } from 'react';

export function AccountSettings(props) {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNavigateToDashboard = () => {
    navigate('/seller_dashboard'); 
  };

  return (
    <div className="account-settings-container">
      <div className="user-show-container gap-10px">
        <div className='container-col'>
          <button onClick={handleNavigateToDashboard}>Seller Dashboard</button> 
          <button>Shopping Cart</button>
          <button>Shipping Address</button>
          <button>Payment Methods</button>
        </div>
      </div>
      
      <div className="users-shops-index-container">
        <h2>Hello, {currentUser.first_name}!</h2>
        <div className="users-shops-index-container">
          <div>
            <UserShow />
          </div>
        </div>
        <div className="users-shops-index-container">
        <UsersShopsIndex />
      </div></div>
    </div>
  );
}

export default AccountSettings;

// Note to self: add button for UserUpdate and CreateShop on modals
