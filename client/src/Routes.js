//import main css folder, react, and react hooks

import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useUser } from "./components/UserContext/UserContext.js";

//import components
import List from "./components/List/List";
import Login from "./components/Login/Login";
import Createacc from "./components/Createacc/Createacc";

function Routes() {
  const { user } = useUser();

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user === "nologin" ? (
            <Redirect to="/login" />
          ) : (
            <Redirect to="/list" />
          )}
        </Route>
        <Route path="/createacc" component={Createacc} />
        <Route path="/login" component={Login} />
        <Route path="/list">
          {user === "nologin" ? <Redirect to="/login" /> : <List />}
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
