import { React, useState, useEffect } from "react";
import "./Example.css";
import Axios from "axios";

function Example() {
  const [day, setday] = useState(0);
  const [done, setdone] = useState("");
  const [mood, setmood] = useState("");
  const [newdone, setnewdone] = useState("");
  const [newmood, setnewmood] = useState("");

  const [infolist, setinfolist] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setinfolist(response.data);
    });
  }, []);

  const addToList = () => {
    Axios.post("http://localhost:3001/insert", {
      day: day,
      done: done,
      mood: mood,
    });
  };

  const updateMood = (id) => {
    Axios.put("http://localhost:3001/updatemood", {
      id: id,
      newmood: newmood,
    });
  };

  const updateDone = (id) => {
    Axios.put("http://localhost:3001/updatedone", {
      id: id,
      newdone: newdone,
    });
  };

  const deleteMood = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  };

  return (
    <div className="form">
      <h1>Shopping List</h1>
      <input
        className="form_input"
        type="number"
        placeholder="what number day is it"
        onChange={(e) => {
          setday(e.target.value);
        }}
      />
      <input
        className="form_input"
        type="text"
        placeholder="what I did today"
        onChange={(e) => {
          setdone(e.target.value);
        }}
      />
      <input
        className="form_input"
        type="text"
        placeholder="how my mood is after coding today"
        onChange={(e) => {
          setmood(e.target.value);
        }}
      />
      <button onClick={addToList}>Add to list</button>

      <h1>My List</h1>

      {infolist.map((val, key) => {
        return (
          <div key={key} className="result">
            <h4>Day: {val.day}</h4>
            <h4>Done: {val.done}</h4>
            <input
              type="text"
              placeholder="new done"
              onChange={(e) => {
                setnewdone(e.target.value);
              }}
            />
            <button onClick={() => updateDone(val._id)}>Update Done</button>
            <h4>Mood: {val.mood}</h4>
            <input
              type="text"
              placeholder="new mood"
              onChange={(e) => {
                setnewmood(e.target.value);
              }}
            />
            <button onClick={() => updateMood(val._id)}>Update Mood</button>
            <button onClick={() => deleteMood(val._id)}>Delete Entry</button>
          </div>
        );
      })}
    </div>
  );
}

export default Example;
