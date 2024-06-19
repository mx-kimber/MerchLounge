import React from 'react';
import ShopsIndex from './ShopsIndex';

export function MerchLounge({ shops }) {
  return ( 
  
    <div> 
      <h2>Shops</h2>
      <div className="#">
        <ShopsIndex shops={shops} />
      </div>
    </div>
  );
}

export default MerchLounge;
