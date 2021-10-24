import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login_div">
      <h2>Login</h2>
      <form className="login_form">
        <input type="text" placeholder="username"></input>
        <input type="text" placeholder="password"></input>
        <button type="submit">Log In</button>
        <Link to="/createacc">
          <li>Don't have an account?</li>
        </Link>
      </form>
    </div>
  );
}

export default Login;
