const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

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
  "mongodb+srv://lukostelloe:12rudimental@cluster0.w2vqg.mongodb.net/test",
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

// delete item from list, needs to be fixed
app.delete("/deletefromlist/:id", async (req, res) => {
  const id = req.params.id;

  await listModel.findByIdAndDelete({ id: item }).exec();
  res.send("deleted");
});

//delete list
app.delete("/deletelist/:id", async (req, res) => {
  const id = req.params.id;

  await listModel.findByIdAndDelete(id).exec();
  res.send("deleted");
});
