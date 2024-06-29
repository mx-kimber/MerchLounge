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
      
      <div className="gap-10 justify-right">
      
        <button className="nav-button" onClick={handleShowLogin}>Login</button>
        <button className="nav-button" onClick={handleShowSignup}>Signup</button>
      </div>
    );
  } else {
    authenticationLinks = (

      <div className="gap-10 justify-right">
        <LogoutLink />
      <button className="nav-button" onClick={handleNavToUserSettings}>Account Settings</button>
      </div>
    );
  }

  return (
    <header>
      
        <div className="container-row">

          <div className="logo" onClick={handleNavToHome} style={{ cursor: "pointer" }}>
            <div className="container-row align-center width-100">
            <div className="font-105 i"><b>l</b></div>
          
              <div className="font-105 m "><b>M</b></div>
         
              <div className="font-30 erch">erch</div>
              <div className="font-100 l"><b>L</b></div>
              <div className="font-20 ounge">ounge</div>
            
          
                    
        </div>
        </div> <div className="justify-right width-100">
   {authenticationLinks} 
        </div></div>
   
      <Modal show={modalVisible} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
    </header>
  );
}

export default Header;
