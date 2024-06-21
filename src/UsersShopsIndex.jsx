import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import { Modal } from './Modal';
import ShopCreate from './ShopCreate';
import ShopDelete from './ShopDelete';
import ShopShow from './ShopShow';
import ShopUpdate from './ShopUpdate';

export function UsersShopsIndex() {
  const [shops, setShops] = useState([]);
  const { currentUser } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    handleIndexUsersShops();
  }, []);

  const handleShopCreateModal = () => {
    setModalContent(<ShopCreate />);
    setModalVisible(true);
  };

  const handleAddProductsToShop = () => {
    setModalContent(null);
    setModalVisible(true);
  };

  const handleShopShowModal = (shop) => {
    setModalContent(<ShopShow shop={shop} />);
    setModalVisible(true);
  };

  const handleShopEditModal = (shop) => {
    setModalContent(<ShopUpdate shop={shop} onUpdateShop={handleUpdateShop} />);
    setModalVisible(true);
  };

  const handleShopDeletion = (shopId) => {
    setModalContent(<ShopDelete shopId={shopId} onDeleteSuccess={() => handleIndexUsersShops()} />);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  const handleIndexUsersShops = () => {
    axios.get("http://localhost:3000/shops.json")
      .then((response) => {
        console.log(response.data);
        setShops(response.data);
      })
      .catch((error) => {
        console.error('Error fetching shops:', error);
      });
  };

  const handleUpdateShop = (updatedShop) => {
    setShops(shops.map(shop => (shop.id === updatedShop.id ? updatedShop : shop)));
  };

  return (
    <div className='container-col'>
      <div className='#'>
        <div><h2>Shops</h2>
          <button onClick={handleShopCreateModal}>Create new shop</button>
        </div>
      </div>

      {currentUser && currentUser.shops && (
        currentUser.shops.map(shop => (
          <div key={shop.id} className='#'>
            <div className='user-shops'>
              <img
                src={shop.image}
                alt={shop.shop_name}
                onClick={() => handleShopShowModal(shop)}
                style={{ cursor: 'pointer' }}
              />
              <div className='container-col'>
                <div>{shop.shop_name}</div>
              </div>
              <div className='container-col'>
                <div>
                  <button onClick={() => handleAddProductsToShop()}>Add products</button>
                </div>
                <div>
                  <button onClick={() => handleShopEditModal(shop)}>Edit shop</button>
                </div>
                <div>
                  <button onClick={() => handleShopDeletion(shop.id)}>Remove shop</button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      <Modal show={modalVisible} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

export default UsersShopsIndex;
