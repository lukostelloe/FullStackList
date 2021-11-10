import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Dashboard.css";
import { Link } from "react-router-dom";

function Dashboard() {
  const [currentList, setCurrentList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/readlist").then((response) => {
      setCurrentList([...response.data]);
    });
  }, []);

  console.log(currentList);

  return (
    <div className="dashboard">
      <div className="dashboard_container">
        <h2>Welcome, Luke</h2>
        <h2>Your lists</h2>
        {currentList.map((m) => {
          return <div key={m.listname}>{m.items}</div>;
        })}
        <Link to="/login" className="logout">
          <li>Log Out</li>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
