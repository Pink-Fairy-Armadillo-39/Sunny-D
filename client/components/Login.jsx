import React, { useState } from "react";
import { Link } from "react-router-dom";



function Login() {
  const [zipcode, setZipcode] = useState(0);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  


  // const handleChange = () => {
  //   setZipcode(document.getElementById("zipcodeInput").value);
  //   setName(document.getElementById("nameInput").value.toUpperCase());

  // };


  return (
    <div id="loginElements">
      <form className="flex">
        <input
          id="nameInput"
          name="username"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          type='password'
          id="passwordInput"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          id="zipcodeInput"
          name="zipcode"
          placeholder="Zip Code"
          onChange={(e) => setZipcode(e.target.value)}
        ></input>
      </form>

      <button id="loginButton">
        <Link
          to="/home"
          state={{ zipcodeEntry: zipcode, nameEntry: name }}
        >
          <div className="sunnyD-img"></div>
        </Link>
      </button>
    </div>
  );
}

export default Login;
