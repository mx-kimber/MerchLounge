import React from 'react';
import UserShow from './UserShow';
import UsersShopsIndex from './UsersShopsIndex';
import ShopCreate  from './ShopCreate';

export function AccountSettings() {
  return (
    <div className="container-row2">
      <div className="container-row outline">
        <UserShow />
      </div>
      <div className="container-row outline">
        <UsersShopsIndex />
        
      </div>
    </div>
  );
}

export default AccountSettings;


// note to self: add button for UserUpdate and CreateShop on modals 