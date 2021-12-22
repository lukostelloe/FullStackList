import React, { useContext } from "react";
import { Context } from "../Context/Context";

export default function ComponentB() {
  const [context, setContext] = useContext(Context);
  return <div>ComponentB: {context}</div>;
}
