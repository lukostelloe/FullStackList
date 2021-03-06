import "./Createacc.css";

import { React, useState } from "react";
import { Link } from "react-router-dom";

import Axios from "axios";

function Createacc() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [confpass, setconfpass] = useState("");
  const [userlist, setuserlist] = useState([]);
  const [warning, setwarning] = useState(false);
  const [account, setAccount] = useState(false);

  //creating a regex that requires a lowercase letter, uppercase letter, and number
  const validPass = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).+$/);

  const addToList = async () => {
    //if the password does not meet regex requirements...
    if (!validPass.test(password)) {
      console.log("password not right");
      setwarning(true);
    } else {
      //if match requirements, insert the username and password into the database
      console.log("nice password");
      setwarning(false);
      if (password === confpass) {
        try {
          const response = await Axios.post(
            "http://localhost:3001/insertuser",
            {
              username: username,
              password: password,
            }
          );
          //set the existing users to this list and set an account being activated to true
          setuserlist([...userlist, response.data]);
          setAccount(true);
          console.log("account created!");
        } catch (error) {
          console.log("there is an error with addToList function");
        }
      } else {
        setwarning(true);
        console.log("pass and conf don't match");
      }
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
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="confirm password"
            value={confpass}
            onChange={(e) => setconfpass(e.target.value)}
          ></input>
          <p className={warning ? "nopass" : "pass"}>
            password must contain uppercase, lowercase and number
          </p>
          <button type="button" onClick={addToList}>
            Create Account
          </button>
          <Link to="/login">
            <li>Already have an account?</li>
          </Link>
          {/* conditional render, if an account has been created, or if it hasnt (setAccount(true) or setAccount(false)) */}
          <p className={account ? "account" : "noaccount"}>Account Created!</p>
        </form>
      </div>
    </div>
  );
}

export default Createacc;
