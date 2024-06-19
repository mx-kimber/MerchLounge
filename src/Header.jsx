import "./Header.css";
import { LogoutLink } from "./LogoutLink";
import { useState } from "react";
import { Modal } from "./Modal";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  const handleShowSignup = () => {
    setModalContent(<Signup onClose={handleCloseModal} />);
    setModalVisible(true);
  };

  const handleShowLogin = () => {
    setModalContent(<Login onClose={handleCloseModal} />);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  const handleNavToHome = () => {
    navigate("/MerchLounge");
  };

  const handleNavToUserSettings = () => {
    navigate("/account_settings");
  };

  let authenticationLinks;
  if (localStorage.jwt === undefined) {
    authenticationLinks = (
      <div className="nav-links">
        <button onClick={handleShowLogin}>Login</button>
        <button onClick={handleShowSignup}>Signup</button>
      </div>
    );
  } else {
    authenticationLinks = (
      <div className="nav-links">
        <LogoutLink />
        <button onClick={handleNavToUserSettings}>Account Settings</button>
      </div>
    );
  }

  return (
    <header>
      <div className="nav-links">
        <div>{authenticationLinks}</div>
      </div>

      <div className="logo-container" >
        <div className="m-logo" onClick={handleNavToHome} style={{ cursor: "pointer" }}>
          <div className="logo-M-font-100">M</div>
          <div className="erchLounge-container">
            <div className="logo-font-30">erch</div>
            <div className="logo-font-50">L</div>
            <div className="logo-font-30 ounge-skooch">ounge</div>
          </div>
        </div>
      </div>

      <Modal show={modalVisible} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
    </header>
  );
}

export default Header;
