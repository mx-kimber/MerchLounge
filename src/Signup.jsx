import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "./UserContext";

export function Signup() {
  const { setCurrentUser } = useContext(UserContext);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);

    const email = params.get("email");
    const password = params.get("password");

    axios
      .post("http://localhost:3000/users.json", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();

        axios
          .post("http://localhost:3000/sessions.json", { email, password })
          .then((loginResponse) => {
            console.log(loginResponse.data);
            axios.defaults.headers.common["Authorization"] = "Bearer " + loginResponse.data.jwt;
            localStorage.setItem("jwt", loginResponse.data.jwt);

            axios.get("http://localhost:3000/users/current_user.json")
              .then((userResponse) => {
                setCurrentUser(userResponse.data);
                window.location.href = "/merchlounge";
              })
              .catch((error) => {
                console.error("Error fetching current user:", error);
              });
          })
          .catch((loginError) => {
            console.log(loginError.response);
            setErrors(["Signup succeeded, but login failed. Please try logging in manually."]);
            window.location.href = "/login";
          });
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div className='container-col align-center' id="signup">
      <h1>Signup</h1>
      {errors.length > 0 && (
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className='container-col align-center'>
          <div>
            <label>First Name:</label>
            <input name="first_name" type="text" autoComplete="off" />
          </div>
          <div>
            <label>Last Name:</label>
            <input name="last_name" type="text" autoComplete="off" />
          </div>
          <div>
            <label>Phone:</label>
            <input name="phone_number" type="text" autoComplete="off" />
          </div>
          <div>
            <label>Email:</label>
            <input name="email" type="email" autoComplete="off" />
          </div>
          <div>
            <label>Password:</label>
            <input name="password" type="password" autoComplete="new-password" />
          </div>
          <div>
            <label>Password:</label>
            <input name="password_confirmation" type="password" autoComplete="new-password" />
          </div>
          <button type={handleSubmit}>Signup</button>
          {/* <div>
            <label>Seller:</label>
            <input name="seller" type="checkbox" />
          </div> */}
        </div>
        
      </form>
    </div>
  );
}
