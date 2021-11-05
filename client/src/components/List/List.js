import { React, useState, useEffect } from "react";
import "./List.css";

import Modal from "../Modal/Modal";
import Axios from "axios";

import editimage from "../images/edit.png";
import binimage from "../images/bin.png";

function List() {
  const [openmodal, setopenmodal] = useState(false);

  const [number, setnumber] = useState(0);
  const [item, setitem] = useState("");

  const [currentlist, setCurrentList] = useState([]);

  const [newitem, setnewitem] = useState("");
  const [newnumber, setnewnumber] = useState(0);

  const [listitems, setListItems] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setCurrentList(response.data);
      console.log(response.data);
    });
  }, []);

  const addToList = async () => {
    try {
      const response = await Axios.post("http://localhost:3001/insert", {
        item: item,
        number: number,
      });
      setCurrentList([...currentlist, response.data]);
    } catch (error) {
      console.log("there is an error with addToList function");
    }
  };

  const saveList = async () => {
    try {
      const response = await Axios.post("http://localhost:3001/insertlist", {
        items: currentlist,
      });
      setListItems(...currentlist, response.data);
      console.log(listitems);
    } catch (error) {
      console.log("there is an error with saveList function");
    }
  };

  const updateItem = async (id) => {
    try {
      const response = await Axios.put("http://localhost:3001/updateitem", {
        id: id,
        newitem: newitem,
      });
      console.log(response.data);
      setnewitem([response.data]);
    } catch (error) {
      console.log("there is an error with updateitem function");
    }
    window.location.reload();
  };

  const updateNumber = (id) => {
    Axios.put("http://localhost:3001/updatenumber", {
      id: id,
      newnumber: newnumber,
    });
    window.location.reload();
  };

  const deleteId = async (id) => {
    try {
      await Axios.delete(`http://localhost:3001/delete/${id}`);
    } catch (error) {
      console.log("there is an error with delete function");
    }
    window.location.reload();
  };

  const toggleTickOnOff = (e) => {
    if (e.target.className === "tickbuttonOn") {
      e.target.className = "tickbuttonOff";
    } else {
      e.target.className = "tickbuttonOn";
    }
  };

  const logOut = () => {
    console.log("logout");
  };

  return (
    <div className="full_app">
      <h2>Welcome (logindetails)</h2>
      <div className="entry_and_form">
        <form className="form">
          <input
            className="form_input"
            type="text"
            placeholder="item"
            onChange={(e) => {
              setitem(e.target.value);
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
        <div className="list">
          {currentlist.map((val) => {
            return (
              <div key={val._id} className="info_list">
                <div className="buttons_div">
                  <button className="tickbuttonOn" onClick={toggleTickOnOff}>
                    {val.item}
                    {"    "}
                    {val.number}
                  </button>
                  <div>
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
                  </div>
                </div>
                {openmodal === val._id && (
                  <Modal>
                    <div>
                      <div className="item_description">
                        <h2>{val.item}</h2>
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
                          setnewitem(e.target.value);
                        }}
                      />
                      <button
                        className="update_button"
                        onClick={() => updateItem(val._id)}
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
      <button
        className={currentlist.length > 0 ? "save" : "nosave"}
        onClick={saveList}
      >
        Save list
      </button>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
}

export default List;
