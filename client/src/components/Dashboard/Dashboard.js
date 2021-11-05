import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Dashboard.css";
import { Link } from "react-router-dom";

function Dashboard() {
  const [currentlist, setCurrentList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setCurrentList([...response.data]);
    });
  }, []);

  console.log(currentlist);

  return (
    <div className="dashboard">
      <div className="dashboard_container">
        <h2>Welcome, Luke</h2>
        <h2>Your lists</h2>
        {currentlist.map((m) => {
          return <div key={m._id}>{m.items}</div>;
        })}
        <Link to="/login" className="logout">
          <li>Log Out</li>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
