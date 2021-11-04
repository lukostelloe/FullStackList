import { React, useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [userdetails, setUserDetails] = useState("");
  const [warning, setwarning] = useState(false);
  let history = useHistory();

  console.log({ userdetails });

  function submitLoginForm(e) {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    Axios.get("http://localhost:3001/readlogin", {
      params: { username, password },
    }).then((response) => {
      setUserDetails(response.data);
      console.log(userdetails);
    });

    if (
      userdetails.username === username &&
      userdetails.password === password
    ) {
      console.log("username and password match");
      history.push("/list");
    } else {
      console.log("no match at all");
      setwarning(true);
      setUserDetails("");
    }
  }

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
