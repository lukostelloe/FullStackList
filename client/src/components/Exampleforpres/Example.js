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

const express = require("express");
const app = express();
const port = 3000;

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
