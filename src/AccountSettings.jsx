import React from 'react';
import UserShow from './UserShow';
import UsersShopsIndex from './UsersShopsIndex';
import "./AccountSettings.css"

export function AccountSettings() {
  return (
    <div className="account-settings-container">
      <div className="user-show-container">
        <UserShow />
      </div>
      <div className="users-shops-index-container">
        <UsersShopsIndex />
      </div>
    </div>
  );
}

export default AccountSettings;



// note to self: add button for UserUpdate and CreateShop on modals 