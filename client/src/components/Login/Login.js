import { React, useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import Axios from "axios";

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [userlist, setuserlist] = useState([]);

  // const handleSubmit = (e) => {
  //   setusername(e.target.value);
  //   setpassword(e.target.value);
  //   console.log({ username }, { password });
  // };

  const addToList = async () => {
    try {
      const response = await Axios.post("http://localhost:3001/insertlogin", {
        username: username,
        password: password,
      });
      setuserlist([...userlist, response.data]);
    } catch (error) {
      console.log("there is an error with addToList function");
    }

    // update component state
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
        <button type="button" onClick={addToList}>
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
