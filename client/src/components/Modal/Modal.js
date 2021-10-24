import React from "react";
import "./Modal.css";

function Modal({ children }) {
  return (
    <div className="result">
      <div>{children}</div>
    </div>
  );
}

export default Modal;
