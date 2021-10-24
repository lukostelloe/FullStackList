import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import List from "./components/List/List";
import Login from "./components/Login/Login";
import Createacc from "./components/Createacc/Createacc";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/createacc" component={Createacc} />
          <Route path="/login" component={Login} />
          <Route path="/list" component={List} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
