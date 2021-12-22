import React, { useContext } from "react";
import { Context } from "../Context/Context";

export default function ComponentA() {
  const [context, setContext] = useContext(Context);
  return (
    <div>
      ComponentA:
      <button onClick={() => setContext(9)}>Change Context Value</button>
    </div>
  );
}
