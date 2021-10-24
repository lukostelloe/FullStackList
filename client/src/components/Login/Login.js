import { React, useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = (e) => {
    setusername(e.target.value);
    setpassword(e.target.value);
    console.log({ username }, { password });

    //if username and password exists, send to list page
  };

  return (
    <div className="login_div">
      <h2>Login</h2>
      <form className="login_form">
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        ></input>
        <button type="button" onClick={handleSubmit}>
          Log In
        </button>
        <Link to="/createacc">
          <li>Don't have an account?</li>
        </Link>
      </form>
    </div>
  );
}

export default Login;
