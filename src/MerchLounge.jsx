import React from 'react';
import ShopsIndex from './ShopsIndex';
import AllProducts from './AllProducts';
export function MerchLounge({ shops }) {
  return ( 
  
    <div> 
      <h2>Shops</h2>
      <div className="#">
        <ShopsIndex shops={shops} />
      </div>
      <div>
        <AllProducts />
      </div>
    </div>
  );
}

export default MerchLounge;
