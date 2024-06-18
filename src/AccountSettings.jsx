import React from 'react';
import UserShow from './UserShow';
import UsersShopsIndex from './UsersShopsIndex';
import ShopCreate  from './ShopCreate';

export function AccountSettings() {
  return (
    <div className="#">
      <div className="#">
        Account Settings
      </div>
      <div className="#">
        <UserShow />
      </div>
      <div className="#">
        <UsersShopsIndex />
        <ShopCreate />
      </div>
    </div>
  );
}

export default AccountSettings;


// note to self: add button for UserUpdate and CreateShop on modals 