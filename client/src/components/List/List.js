import { React, useState, useEffect } from "react";
import "./List.css";

import Modal from "../Modal/Modal";
import Axios from "axios";

import editimage from "../images/edit.png";
import binimage from "../images/bin.png";

function List() {
  const [number, setnumber] = useState(0);
  const [item, setitem] = useState("");
  const [newitem, setnewitem] = useState("");
  const [newnumber, setnewnumber] = useState(0);
  const [infolist, setinfolist] = useState([]);
  // const [list, setlist] = useState([]);
  const [openmodal, setopenmodal] = useState(false);
  const [logindetails, setlogindetails] = useState("");

  ///////////////////////// TO DO ///////////////////////////////

  //1. Another page for the site (Dashboard with user details maybe?)

  //2. On list page, a welcome (user) atm I cannot display user that just logged in

  //3. Passing data between components (taking the user login details, user list) (axios.read??)

  //4. Personal list for each user (ability to save and create multiple lists with names, store the array in a new array (List 1, list 2, list 3))

  //5. hash passwords in the database ("bcrypt")

  //6. safe login and logout (using Axios again???)

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setinfolist(response.data);
    });
  }, []);

  // useEffect(() => {
  //   Axios.get("http://localhost:3001/readlogin").then((login) => {
  //     setlogindetails(login);
  //   });
  //   console.log(logindetails);
  // });

  const addToList = async () => {
    try {
      const response = await Axios.post("http://localhost:3001/insert", {
        item: item,
        number: number,
      });
      setinfolist([...infolist, response.data]);
    } catch (error) {
      console.log("there is an error with addToList function");
    }
    // update component state
  };

  // const saveList = async () => {
  //   try {
  //     const response = await Axios.post("http://localhost:3001/insertlist", {
  //       list: list,
  //     });
  //     setlist([...list, response.data]);
  //     console.log(list);
  //   } catch (error) {
  //     console.log("there is an error with the saveList function");
  //   }
  // };

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
    // update component state
  };

  const updateNumber = (id) => {
    Axios.put("http://localhost:3001/updatenumber", {
      id: id,
      newnumber: newnumber,
    });
    window.location.reload();
  };

  const deleteId = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
    window.location.reload();
    // filter deleted item
  };

  const toggleTickOnOff = (e) => {
    if (e.target.className === "tickbuttonOn") {
      e.target.className = "tickbuttonOff";
    } else {
      e.target.className = "tickbuttonOn";
    }
  };

  const saveList = () => {
    console.log("hello");
    console.log(infolist);
  };

  return (
    <div className="full_app">
      <h2>Welcome {logindetails[0]}</h2>
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
          {infolist.map((val) => {
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
        className={infolist.length > 0 ? "save" : "nosave"}
        onClick={saveList}
      >
        Save list
      </button>
    </div>
  );
}

export default List;
