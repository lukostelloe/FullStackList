import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Example from "./components/Example/Example";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Example />
    </div>
  );
}

export default App;

{
  /* <button onClick={() => setopenmodal(true)}>Open Modal</button>
      {openmodal && <Modal closeModal={setopenmodal} />} */
}
