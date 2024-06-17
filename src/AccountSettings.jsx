import React from 'react';
import UserShow from './UserShow';
import UserUpdate from './UserUpdate';

export function AccountSettings() {
  return (
    <div className='#'>
      <div className='#'>
        Account Settings
      </div>
      <div className='#'>
        <UserShow />
        {/* <UserUpdate /> */}
        {/* <CreateShop /> */}
      </div>
    </div>
  )
}

export default AccountSettings;


// note to self: add button for UserUpdate and CreateShop on modals 