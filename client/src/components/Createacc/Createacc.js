import React from "react";
import "./Createacc.css";
import { Link } from "react-router-dom";

function Createacc() {
  return (
    <div className="login_div">
      <h2>Create Account</h2>
      <form className="login_form">
        <label htmlFor="username"> Create Username</label>
        <input type="text" placeholder="username"></input>
        <label htmlFor="password">Create Password</label>
        <input type="text" placeholder="password"></input>
        <label htmlFor="confirm-password">Confirm Password</label>
        <input type="text" placeholder="confirm password"></input>
        <button type="submit">Create Account</button>
        <Link to="/login">
          <li>Already have an account?</li>
        </Link>
      </form>
    </div>
  );
}

export default Createacc;
