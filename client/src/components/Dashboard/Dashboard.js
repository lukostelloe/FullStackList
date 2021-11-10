import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Dashboard.css";
import { Link } from "react-router-dom";

function Dashboard() {
  const [currentList, setCurrentList] = useState([]);
  const [items, setItems] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setItems(response.data);
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/readlist").then((response) => {
      console.log(response.data);
      setCurrentList(response.data);
    });
  }, []);

  console.log(currentList);

  return (
    <div className="dashboard">
      <div className="dashboard_container">
        <h2>Welcome, Luke</h2>
        <h2>Your lists</h2>
        {currentList.map((m) => {
          return <div key={m}>{m.listname}</div>;
        })}
        <Link to="/login" className="logout">
          <li>Log Out</li>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
