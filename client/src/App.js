//import main css folder, react, and react hooks

import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from "./components/UserContext/UserContext.js";

//import components
import Navbar from "./components/Navbar/Navbar";
import List from "./components/List/List";
import Login from "./components/Login/Login";
import Createacc from "./components/Createacc/Createacc";

function App() {
  const [value, setValue] = useState("nologin");

  return (
    <Router>
      <div className="App">
        <Navbar />
        <UserContext.Provider value={{ value, setValue }}>
          <Switch>
            <Route path="/createacc" component={Createacc} />
            <Route path="/login" component={Login} />
            <Route path="/list" component={List} />
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
