const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");

//importing models
const userModel = require("./models/User");
const itemModel = require("./models/Item");
const listModel = require("./models/List");

//recognise incoming Request Objects as JSON
app.use(express.json());
//enable the express server to respond to preflight requests
app.use(cors());

//connect to the database, a username and password is inserted into the address
mongoose.connect(
  "mongodb+srv://{username}:{password}@cluster0.w2vqg.mongodb.net/test",
  {
    useNewUrlParser: true,
  }
);

//assign the server to an address
app.listen(3001, () => {
  console.log("server running on port 3001");
});

//get items
app.get("/items", async (req, res) => {
  const { item_id } = req.body;

  if (!item_id) {
    return res.send("Error!");
  }

  try {
    const results = await Item.find({ item_id });

    return res.send(results);
  } catch (error) {
    res.send(error);
  }
});

//get lists
app.get("/lists", async (req, res) => {
  const { list_id } = req.body;

  if (!list_id) {
    return res.send("Error!");
  }

  try {
    const results = await List.find({ list_id });

    return res.send(results);
  } catch (error) {
    return res.send(error);
  }
});

//create item
app.post("/insert", async (req, res) => {
  const numbers = req.body.number;
  const items = req.body.item;

  const itemsummary = new itemModel({ number: numbers, item: items });

  try {
    await itemsummary.save();
    res.send(itemsummary);
  } catch (err) {
    console.log(err);
  }
});

//create list
app.post("/insertlist", async (req, res) => {
  const listnames = req.body.listname;
  const listitems = req.body.items;

  const listsummary = new listModel({
    listname: listnames,
    items: listitems,
  });

  try {
    await listsummary.save();
    res.send(listsummary);
  } catch (err) {
    console.log(err);
  }
});

//create login
app.post("/insertuser", async (req, res) => {
  const users = req.body.username;
  const passwords = req.body.password;

  const summarylogin = new userModel({
    username: users,
    password: passwords,
  });

  try {
    await summarylogin.save();
    res.send(summarylogin);
  } catch (err) {
    console.log(err);
  }
});

//read
app.get("/read", async (req, res) => {
  itemModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.get("/readlist", async (req, res) => {
  listModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

//check username and password for login
app.get("/readuser", async (req, res) => {
  const { username, password } = req.query;

  if (username.length < 1) {
    return res.send({ message: "please add username" });
  }

  userModel.findOne(
    {
      username,
      password,
    },
    (err, result) => {
      if (err) {
        res.send(err);
      }
      res.send(result);
    }
  );
});

//update item
app.put("/updateitem", async (req, res) => {
  const newitem = req.body.newitem;
  const id = req.body.id;

  try {
    await itemModel.findById(id, (err, updatedItem) => {
      updatedItem.item = newitem;
      updatedItem.save();
      res.send("update");
    });
  } catch (err) {
    console.log(err);
  }
});

//update number
app.put("/updatenumber", async (req, res) => {
  const newnumber = req.body.newnumber;
  const id = req.body.id;

  try {
    await itemModel.findById(id, (err, updatedNumber) => {
      updatedNumber.number = newnumber;
      updatedNumber.save();
      res.send("update");
    });
  } catch (err) {
    console.log(err);
  }
});

//delete item
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await itemModel.findByIdAndDelete(id).exec();
  res.send("deleted");
});

//delete list
app.delete("/deletelist/:id", async (req, res) => {
  const id = req.params.id;

  await listModel.findByIdAndDelete(id).exec();
  res.send("deleted");
});

//this goes into the delete function

// Two options to solve this issue;

// 1. Instead of storing an array of objects in the items property on a list instead store an array of strings containing the item IDs
// when you get a list build an array of objects for the items by querying the item collection on the fly.

// when deleting an item also delete that ID string from the list items array

// 2. Keep the current schema i.e. items cofntaining array of objects, but when deleting an item also loop trough the list items array to find
// corresponding item and delete that item and update the list

// For both options you will need to delete all list items that are insiode the items array on the list object

// when you add an item to a list make sure to add the list id to that item e.g. list_id: "123123123"

// const item = itemModel.findById(id);

//   if (item.list_id) {
//     await listModel.findOneAndUpdate(
//       { _id: listId },
//       { $pull: { items: { _id: id } } },
//       { safe: true, multi: false }
//     );
//   }
