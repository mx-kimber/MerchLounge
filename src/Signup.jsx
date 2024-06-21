import axios from "axios";
import { useState } from "react";

export function Signup() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/users.json", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = "/account_settings"; 
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div className='container-col align-center' id="signup">
      <h1>Signup</h1>
     
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      
      <form onSubmit={handleSubmit}>
      <div className='container-col align-right'>
        <div>
          First Name: <input name="first_name" type="text" />
        </div>
        <div>
          Last Name: <input name="last_name" type="text" />
        </div>
        <div>
          Phone: <input name="phone_number" type="text" />
        </div>
        <div>
          Email: <input name="email" type="email" />
        </div>
        <div>
          Password: <input name="password" type="password" />
        </div>
        <div>
          Password confirmation: <input name="password_confirmation" type="password" />
        </div>
        <div>
          Seller: <input name="seller" type="checkbox" />
        </div></div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}