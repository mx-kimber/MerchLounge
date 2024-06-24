import React from 'react';
import UserShow from './UserShow';
import UsersShopsIndex from './UsersShopsIndex';
import "./AccountSettings.css"
import ProductIndex from './ProductIndex';

export function AccountSettings(props) {


  return (
    <div className="account-settings-container">
      <div className="user-show-container gap-10px">
        <div>
          <UserShow />
        </div>
      
        
      </div>
      
      <div className="users-shops-index-container"><h2>Seller Dashboard</h2>
        <div className="users-shops-index-container">
          
         <ProductIndex />
        </div><UsersShopsIndex />
      </div>
      
    </div>
  );
}

export default AccountSettings;



// note to self: add button for UserUpdate and CreateShop on modals 