import { React, useEffect, useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [userdetails, setuserdetails] = useState("");
  let history = useHistory();

  useEffect(() => {
    Axios.get("http://localhost:3001/readlogin").then((response) => {
      setuserdetails(response.data);
    });
  }, []);

  const checkAndLogin = (e) => {
    console.log(username);
    console.log(password);
    console.log(userdetails);

    for (let i = 0; i < userdetails.length; i++) {
      if (
        userdetails[i].username === username &&
        userdetails[i].password === password
      ) {
        console.log("username and password match");
        history.push("/list");
      } else {
        console.log("no match at all");
        e.target.className = "loginerror";
      }
    }
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
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        ></input>
        <button type="button" className="loginbutton" onClick={checkAndLogin}>
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
