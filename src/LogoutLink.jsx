import axios from "axios";

export function LogoutLink() {
  const handleClick = (event) => {
    event.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    window.location.href = "/merchlounge";
  };

  return (
    <div className="#">
      <button className="nav-button" onClick={handleClick}>
        Logout
      </button>
    </div>
  );
}