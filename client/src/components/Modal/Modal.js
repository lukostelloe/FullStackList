import React from "react";
import "./Modal.css";

function Modal({ closeModal, children }) {
  return (
    <div className="result">
      <button className="close_button" onClick={() => closeModal(false)}>
        {" "}
        X{" "}
      </button>
      <div>{children}</div>
    </div>
  );
}

export default Modal;
