import { React, useState, useEffect } from "react";
import "./Example.css";
import Modal from "../Modal/Modal";
import Axios from "axios";
import clsx from "clsx";
import editimage from "../images/edit.png";
import binimage from "../images/bin.png";

function Example() {
  const [number, setnumber] = useState(0);
  const [done, setdone] = useState("");
  const [newdone, setnewdone] = useState("");
  const [newnumber, setnewnumber] = useState(0);
  const [ticked, setticked] = useState(true);
  const [infolist, setinfolist] = useState([]);
  const [openmodal, setopenmodal] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setinfolist(response.data);
    });
  }, []);

  const addToList = async () => {
    //window.location.reload();
    try {
      const response = await Axios.post("http://localhost:3001/insert", {
        number: number,
        done: done,
      });

      setinfolist([...infolist, response.data]);
    } catch (error) {
      // deal with the error
    }

    // update component state
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
    // filter deleted item
  };

  const toggleTickOnOff = () => {
    if (ticked === false) {
      setticked(true);
    } else if (ticked === true) {
      setticked(false);
    }
  };

  //PROBLEM HERE IS ONCLICK IT IS CHANGING CSS OF ALL THE BUTTONS

  const tickedClasses = clsx(
    ticked ? "tickbuttonOn" : "tickbuttonOff",
    "tickbutton"
  );

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

          <button className="add_button" type="button" onClick={addToList}>
            Add
          </button>
        </form>

        <div>
          {infolist.map((val) => {
            return (
              <div key={val._id} className="info_list">
                <button className={tickedClasses} onClick={toggleTickOnOff}>
                  {val.done}...{val.number}
                </button>
                <button
                  className="edit_button"
                  onClick={() => setopenmodal(val._id)}
                >
                  <img className="editimage" src={editimage} alt="edit" />
                </button>
                {openmodal === val._id && (
                  <Modal closeModal={setopenmodal}>
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
                      {/* <button
                        className="update_button"
                        onClick={() => deleteId(val._id)}
                      >
                        Delete
                      </button> */}
                    </div>
                  </Modal>
                )}

                <button
                  className="bin_button"
                  onClick={() => deleteId(val._id)}
                >
                  <img className="editimage" src={binimage} alt="edit" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Example;
