import { React, useState } from "react";
import "./Createacc.css";
import { Link } from "react-router-dom";
import Axios from "axios";

function Createacc() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [confpass, setconfpass] = useState("");
  const [userlist, setuserlist] = useState([]);

  const addToList = async () => {
    if (password === confpass) {
      try {
        const response = await Axios.post("http://localhost:3001/insertlogin", {
          username: username,
          password: password,
        });
        setuserlist([...userlist, response.data]);
        console.log("account created!");
      } catch (error) {
        console.log("there is an error with addToList function");
      }
    } else {
      console.log("pass and conf don't match");
    }
  };

  return (
    <div className="login_div">
      <div className="login_container">
        <h2>Create Account</h2>
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
          <input
            type="text"
            placeholder="confirm password"
            value={confpass}
            onChange={(e) => setconfpass(e.target.value)}
          ></input>
          <button type="button" onClick={addToList}>
            Create Account
          </button>
          <Link to="/login">
            <li>Already have an account?</li>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Createacc;
