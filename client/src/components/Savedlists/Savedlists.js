import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Savedlists.css";

function Savedlists() {
  const [infolist, setinfolist] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setinfolist(response.data);
      console.log(infolist);
    });
  });

  return (
    <div className="page">
      <h2>Saved lists</h2>
      <div>
        {infolist.map((val) => (
          <div>
            <div>
              {val.item}
              {val.number}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Savedlists;
