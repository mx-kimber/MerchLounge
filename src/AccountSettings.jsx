import React from 'react';
import UserShow from './UserShow';
import UsersShopsIndex from './UsersShopsIndex';


export function AccountSettings() {
  return (
    <div className="#">
      <div className="#">
        <UserShow />
      </div>
      <div className="#">
        <UsersShopsIndex />
      </div>
      {/* <div className="container-row">
        Shops info products
      </div> */}
    </div>
  );
}

export default AccountSettings;


// note to self: add button for UserUpdate and CreateShop on modals 