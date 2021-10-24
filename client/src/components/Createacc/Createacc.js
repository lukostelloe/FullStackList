import { React, useState } from "react";
import "./Createacc.css";
import { Link } from "react-router-dom";

function Createacc() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const handleSubmit = (e) => {
    setusername(e.target.value);
    setpassword(e.target.value);
    setcpassword(e.target.value);
    console.log({ username }, { password }, { cpassword });

    if (password !== cpassword) {
      console.log("passwords don't match!");
    }
  };

  return (
    <div className="login_div">
      <h2>Create Account</h2>
      <form className="login_form">
        <label htmlFor="username"> Create Username</label>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        ></input>
        <label htmlFor="password">Create Password</label>
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        ></input>
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="text"
          placeholder="confirm password"
          value={cpassword}
          onChange={(e) => setcpassword(e.target.value)}
        ></input>
        <button type="button" onClick={handleSubmit}>
          Create Account
        </button>
        <Link to="/login">
          <li>Already have an account?</li>
        </Link>
      </form>
    </div>
  );
}

export default Createacc;
