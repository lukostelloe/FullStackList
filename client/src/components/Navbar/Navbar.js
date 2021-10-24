import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <div>
        <ul>
          <Link to="/login" className="link">
            <li>Login</li>
          </Link>
          <Link to="/createacc" className="link">
            <li>Create Account</li>
          </Link>
          <Link to="/list" className="link">
            <li>List</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
