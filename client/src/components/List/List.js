import "./List.css";

import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "../UserContext/UserContext";

import Modal from "../Modal/Modal";
import Axios from "axios";

//importing images for "edit" and "delete"
import editimage from "../images/edit.png";
import binimage from "../images/bin.png";

function List() {
  const [openmodal, setopenmodal] = useState(false);

  const [number, setnumber] = useState(0);
  const [item, setitem] = useState("");

  const [currentList, setCurrentList] = useState([]);

  const [newitem, setnewitem] = useState("");
  const [newnumber, setnewnumber] = useState(0);

  const [listname, setListName] = useState("");

  const [lists, setLists] = useState([]);

  //useHistory allows us to navigate to another page
  let history = useHistory();

  //getting the value of the user from the UserContext component
  const { user } = useUser();

  //read items database on page render, and display on page
  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setCurrentList(response.data);
    });
  }, []);

  //read lists database on page render, and display on page
  useEffect(() => {
    Axios.get("http://localhost:3001/readlist").then((response) => {
      setLists(response.data);
    });
  }, []);

  //add item (element) to list
  const addToList = async () => {
    try {
      const response = await Axios.post("http://localhost:3001/insert", {
        item: item,
        number: number,
      });
      setCurrentList([...currentList, response.data]);
    } catch (error) {
      console.log("there is an error with addToList function");
    }
  };

  //save list
  const saveList = async () => {
    try {
      const response = await Axios.post("http://localhost:3001/insertlist", {
        listname: listname,
        items: currentList,
      });
      setLists([...lists, response.data]);
    } catch (error) {
      console.log("there is an error with saveList function");
    }
  };

  //update item
  const updateItem = async (id) => {
    try {
      const response = await Axios.put("http://localhost:3001/updateitem", {
        id: id,
        newitem: newitem,
      });
      setnewitem([response.data]);
      Axios.get("http://localhost:3001/read").then((response) => {
        setCurrentList(response.data);
      });
    } catch (error) {
      console.log("there is an error with updateitem function");
    }
  };

  //new update number
  const updateNumber = async (id) => {
    try {
      const response = await Axios.put("http://localhost:3001/updatenumber", {
        id: id,
        newnumber: newnumber,
      });
      setnewnumber([response.data]);
      Axios.get("http://localhost:3001/read").then((response) => {
        setCurrentList(response.data);
      });
    } catch (error) {
      console.log("there is an error with updateitem function");
    }
  };

  // delete item;
  const deleteId = async (id) => {
    try {
      await Axios.delete(`http://localhost:3001/delete/${id}`);
      Axios.get("http://localhost:3001/read").then((response) => {
        setCurrentList(response.data);
      });
    } catch (error) {
      console.log("there is an error with delete function");
    }
  };

  //delete list
  const deleteList = async (id) => {
    try {
      await Axios.delete(`http://localhost:3001/deletelist/${id}`);
      Axios.get("http://localhost:3001/readlist").then((response) => {
        setLists(response.data);
      });
    } catch (error) {
      console.log("there is an error with delete list function");
    }
  };

  //cross out items in the list
  const toggleTickOnOff = (e) => {
    if (e.target.className === "tickbuttonOn") {
      e.target.className = "tickbuttonOff";
    } else {
      e.target.className = "tickbuttonOn";
    }
  };

  //logout button onClick, send the user back to the login page
  const logoutFunction = () => {
    history.push("/login");
  };

  //conditional render, if there is a login value the site is accessible, otherwise there is an alert to log in
  // if (value === "nologin") {
  //   return (
  //     <div>
  //       You must log in to use the app!{" "}
  //       <button onClick={logoutFunction}>Log In</button>
  //     </div>
  //   );
  // } else {
  return (
    <div className="full_app">
      <div className="welcome-line">
        <h2>Welcome, {user}!</h2>
      </div>
      <div className="window">
        <div className="items_div">
          <div className="heading_div">
            <h2>Items</h2>
          </div>

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
              {currentList.map((val) => {
                return (
                  <div key={val._id} className="info_list">
                    <div className="buttons_div">
                      <button
                        className="tickbuttonOn"
                        onClick={toggleTickOnOff}
                      >
                        {val.item}
                        {"    "}
                        {val.number}
                      </button>
                      <div>
                        <button
                          className="edit_button"
                          onClick={() => setopenmodal(val._id)}
                        >
                          <img
                            className="editimage"
                            src={editimage}
                            alt="edit"
                          />
                        </button>
                        <button
                          className="bin_button"
                          onClick={() => deleteId(val._id)}
                        >
                          <img
                            className="editimage"
                            src={binimage}
                            alt="edit"
                          />
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
                            placeholder="edit quantity"
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

        <div className="lists_div">
          <div className="heading_div">
            <h2>Lists</h2>
          </div>

          <div className="list_buttons">
            {lists.map((m) => {
              return (
                <div className="list_buttons_and_delete">
                  <button
                    className="list_item_buttons"
                    onClick={(e) => setCurrentList(m.items)}
                  >
                    {m.listname}
                  </button>
                  <button
                    className="bin_button"
                    onClick={() => deleteList(m._id)}
                  >
                    <img className="editimage" src={binimage} alt="edit" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="savelist_div">
          <div className="heading_div">
            <h2>Save List</h2>
          </div>

          <div className="listsave_div">
            <input
              type="text"
              placeholder="List Name"
              className={currentList.length > 0 ? "saveinput" : "nosaveinput"}
              onChange={(e) => {
                setListName(e.target.value);
              }}
            />
            <button
              className={currentList.length > 0 ? "save" : "nosave"}
              onClick={saveList}
            >
              Save list
            </button>
            <button className="logout_button" onClick={logoutFunction}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// }

export default List;
