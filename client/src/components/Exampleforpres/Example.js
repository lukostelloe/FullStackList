import React from "react";

function Example() {
  const clickButton = () => {
    console.log("button was clicked");
  };

  return (
    <div>
      <button onClick={clickButton}>Click me!</button>
    </div>
  );
}

export default Example;
