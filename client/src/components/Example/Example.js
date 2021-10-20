import { React, useState, useEffect } from "react";
import "./Example.css";
import Axios from "axios";
import editimage from "../images/edit.png";
import binimage from "../images/bin.png";

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
    window.location.reload();
    Axios.put("http://localhost:3001/updatedone", {
      id: id,
      newdone: newdone,
    });
  };

  const updateNumber = (id) => {
    window.location.reload();
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
    <div className="full_app">
      <h1>Shopping List</h1>
      <div className="headings">
        <h2>Add</h2>
        <h2>Edit</h2>
        <h2>List</h2>
      </div>
      <div className="form">
        <form className="form_entry">
          <input
            className="form_input"
            type="text"
            placeholder="item"
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

          <button onClick={addToList}>Add</button>
        </form>

        <div>
          {infolist.map((val, key) => {
            return (
              <div key={key} className="info_list">
                <button className="tickbuttonOn">
                  {val.done}...{val.number}
                </button>
                <button className="editbutton">
                  <img className="editimage" src={editimage} alt="edit" />
                </button>
                <button
                  className="editbutton"
                  onClick={() => deleteId(val._id)}
                >
                  <img className="editimage" src={binimage} alt="edit" />
                </button>
              </div>
            );
          })}
        </div>

        <div>
          {infolist.map((val, key) => {
            return (
              <div key={key} className="result">
                <div>
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
                    Update
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
                    Update
                  </button>
                  <button
                    className="update_button"
                    onClick={() => deleteId(val._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Example;
