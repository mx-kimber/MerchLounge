import React from 'react'

export function ShopsIndex(props) {
  return (
    <div>
    <h1>All shops</h1>
     {props.shops.map((shop) => (
       <div key={shop.id} className='#'>
         <img src={shop.image} />
         <h2>{shop.shop_name}</h2>
         <p>{shop.description}</p>
       </div>
     ))}
  </div>
);
}

export default ShopsIndex