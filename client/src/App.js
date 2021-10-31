import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import List from "./components/List/List";
import Login from "./components/Login/Login";
import Createacc from "./components/Createacc/Createacc";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/createacc" component={Createacc} />
          <Route path="/login" component={Login} />
          <Route path="/list" component={List} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
