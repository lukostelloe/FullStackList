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
      console.log("there is an error with addToList function");
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

  const tickedClasses = clsx(
    ticked ? "tickbuttonOn" : "tickbuttonOff",
    "tickbutton"
  );

  //PROBLEM HERE IS ONCLICK IT IS CHANGING CSS OF ALL THE BUTTONS

  return (
    <div className="full_app">
      <h1>Shopping List</h1>
      <div className="entry_and_form">
        <form className="form">
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
                  <h4>
                    {val.done}...{val.number}
                  </h4>
                </button>
                <button
                  className="edit_button"
                  onClick={() => setopenmodal(val._id)}
                >
                  <img className="editimage" src={editimage} alt="edit" />
                </button>

                <button
                  className="bin_button"
                  onClick={() => deleteId(val._id)}
                >
                  <img className="editimage" src={binimage} alt="edit" />
                </button>
                {openmodal === val._id && (
                  <Modal>
                    <div>
                      <div className="item_description">
                        <h2>{val.done}</h2>
                        <h2>({val.number})</h2>
                        <button
                          className="close_button"
                          onClick={() => setopenmodal(false)}
                        >
                          {" "}
                          X{" "}
                        </button>
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
                    </div>
                  </Modal>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Example;
