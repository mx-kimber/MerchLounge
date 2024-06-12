import "./Header.css";
import { LogoutLink } from "./LogoutLink";
import { useState } from "react";
import { Modal } from "./Modal";
import { Signup } from "./Signup";
import { Login } from "./Login";

export function Header() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleShowSignup = () => {
    setModalContent(<Signup />);
    setModalVisible(true);
  };

  const handleShowLogin = () => {
    setModalContent(<Login />);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  let authenticationLinks;
  if (localStorage.jwt === undefined) {
    authenticationLinks = (
      <div className="container-row">
        <button onClick={handleShowLogin}>Login</button>
        <button onClick={handleShowSignup}>Signup</button>
      </div>
    );
  } else {
    authenticationLinks = <LogoutLink />;
  }

  return (
    <header>
      <div className="nav-links">
        <div>{authenticationLinks}</div>
      </div>

      <div className="logo-container">
        <div className="container">
          <div className="font-100">M</div>
          <div className="container-2">
            <div className="font-30">erch</div>
            <div className="font-50">L</div>
            <div className="font-30 margin-neg-5">ounge</div>
          </div>
        </div>
      </div>

      <Modal show={modalVisible} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
    </header>
  );
}
