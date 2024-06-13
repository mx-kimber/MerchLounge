import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "./UserContext";

const jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export function Login() {
  const { setCurrentUser } = useContext(UserContext);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/sessions.json", params)
      .then((response) => {
        console.log(response.data);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        
        axios.get("http://localhost:3000/users/current_user.json")
          .then((userResponse) => {
            // console.log(userResponse.data); 
            setCurrentUser(userResponse.data); 
          })
          .catch((error) => {
            console.error("Error fetching current user:", error);
          });

        event.target.reset();
        window.location.href = "/merchlounge";
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(["Invalid email or password"]);
      });
  };

  return (
    <div id="login">
      <h1>Login</h1>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          Email: <input name="email" type="email" />
        </div>
        <div>
          Password: <input name="password" type="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}