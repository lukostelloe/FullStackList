import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <div>
        <ul>
          <Link to="/list">
            <li>List</li>
          </Link>
          <Link to="/login">
            <li>Login</li>
          </Link>
          <Link to="/createacc">
            <li>Create Account</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
