import { React, useState } from "react";
import "./Createacc.css";
import { Link } from "react-router-dom";
import Axios from "axios";

function Createacc() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [confpass, setconfpass] = useState("");
  const [userlist, setuserlist] = useState([]);
  const [passerr, setpasserr] = useState(false);

  // const validPass = new RegExp("^[a-zA-Z0-9._:$!%-]$");

  const validPass = new RegExp(/^(?=.*?[a-z][A-Z][0-9]).+$/);

  const addToList = () => {
    if (!validPass.test(password)) {
      console.log("password not right");
    } else {
      console.log("cool password bro");
    }
  };

  // const addToList = async () => {
  //   if (password.length < 5) {
  //     console.log("password too small");
  //   }
  //   if (password === confpass && password.length > 4) {
  //     try {
  //       const response = await Axios.post("http://localhost:3001/insertlogin", {
  //         username: username,
  //         password: password,
  //       });
  //       setuserlist([...userlist, response.data]);
  //       console.log("account created!");
  //     } catch (error) {
  //       console.log("there is an error with addToList function");
  //     }
  //   } else {
  //     console.log("pass and conf don't match");
  //   }
  // };

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
          <p>password must be at least 5 characters</p>
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
