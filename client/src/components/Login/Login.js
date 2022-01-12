import "./Login.css";

import { React, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useUser } from "../UserContext/UserContext";
import Axios from "axios";

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [warning, setwarning] = useState(false);

  //useHistory allows us to navigate to another page
  let history = useHistory();

  //place the value of the username into this context to use elsewhere
  const { setUser } = useUser();

  //read the value of the existing users in the database, check for a match, if successful, log the user in and send them to list page
  const submitLoginForm = async (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    const response = await Axios.get("http://localhost:3001/readuser", {
      params: { username, password },
    });

    if (
      response.data.username === username &&
      response.data.password === password
    ) {
      setUser(username);
      history.push("/list");
    } else {
      console.log("no match at all");
      setwarning(true);
    }
  };

  return (
    <div className="login_div">
      <div className="login_container">
        <h2>SupaList</h2>
        <h2>Log in to your favourite shopping app</h2>
        <form className="login_form" onSubmit={submitLoginForm}>
          <input
            type="text"
            placeholder="username"
            name="username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          ></input>
          <button type="submit" className="loginbutton">
            Log In
          </button>
          <Link to="/createacc">
            <li>Don't have an account?</li>
          </Link>
          <p className={warning ? "warningOn" : "warningOff"}>
            Please enter a valid username/password!
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
