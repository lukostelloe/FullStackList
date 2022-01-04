import "./Navbar.css";

import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <div>
        <ul>
          <Link to="/login" className="link">
            <li>.</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
