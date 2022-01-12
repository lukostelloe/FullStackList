//import main css folder, react, and react hooks
import "./App.css";
import React from "react";
import { UserProvider } from "./components/UserContext/UserContext.js";

//import components
import Routes from "./Routes";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes />
      </UserProvider>
    </div>
  );
}

export default App;
