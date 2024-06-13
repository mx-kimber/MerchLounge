import React from 'react';
import ShopsIndex from './ShopsIndex';

export function MerchLounge({ shops }) {
  return (
    <div className="container-row">
      <ShopsIndex shops={shops} />
    </div>
  );
}

export default MerchLounge;
