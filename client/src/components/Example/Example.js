import { React, useState, useEffect } from "react";
import "./Example.css";
import Axios from "axios";

function Example() {
  const [number, setnumber] = useState(0);
  const [done, setdone] = useState("");
  const [newdone, setnewdone] = useState("");
  const [newnumber, setnewnumber] = useState(0);

  const [infolist, setinfolist] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setinfolist(response.data);
    });
  }, []);

  const addToList = () => {
    window.location.reload();
    Axios.post("http://localhost:3001/insert", {
      number: number,
      done: done,
    });
  };

  const updateDone = (id) => {
    Axios.put("http://localhost:3001/updatedone", {
      id: id,
      newdone: newdone,
    });
  };

  const updateNumber = (id) => {
    Axios.put("http://localhost:3001/updatenumber", {
      id: id,
      newnumber: newnumber,
    });
  };

  const deleteId = (id) => {
    window.location.reload();
    Axios.delete(`http://localhost:3001/delete/${id}`);
  };

  return (
    <div className="form">
      <div className="form_entry">
        <h1>Shopping List</h1>
        <input
          className="form_input"
          type="text"
          placeholder="item needed"
          onChange={(e) => {
            setdone(e.target.value);
          }}
        />
        <input
          className="form_input"
          type="number"
          placeholder="quantity"
          onChange={(e) => {
            setnumber(e.target.value);
          }}
        />

        <button onClick={addToList}>Add to list</button>
      </div>

      <div>
        {infolist.map((val, key) => {
          return (
            <div key={key} className="result">
              <div className="item_description">
                <h3>{val.done}</h3>
                <h3>({val.number})</h3>
              </div>
              <input
                type="text"
                placeholder="edit item"
                onChange={(e) => {
                  setnewdone(e.target.value);
                }}
              />
              <button
                className="update_button"
                onClick={() => updateDone(val._id)}
              >
                Update item
              </button>
              <input
                type="number"
                placeholder="change number"
                onChange={(e) => {
                  setnewnumber(e.target.value);
                }}
              />
              <button
                className="update_button"
                onClick={() => updateNumber(val._id)}
              >
                Update number
              </button>
              <button
                className="update_button"
                onClick={() => deleteId(val._id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Example;
