const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const userModel = require("./models/User");
const itemModel = require("./models/Item");
const listModel = require("./models/List");

app.use(express.json());
app.use(cors());

//CONNECT TO THE DB
mongoose.connect(
  "mongodb+srv://lukostelloe:12rudimental@cluster0.w2vqg.mongodb.net/test",
  {
    useNewUrlParser: true,
  }
);

//GET LISTS
app.get("/lists", async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.send("Error!");
  }

  try {
    const results = await List.find({ user_id });

    return res.send(results);
  } catch (error) {
    return res.send(error);
  }
});

//GET ITEMS
app.get("/items", async (req, res) => {
  const { list_id } = req.body;

  try {
    const results = await Item.find({ list_id });
    return res.send(results);
  } catch (error) {
    res.send(error);
  }
});

//CREATE ITEM
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

//CREATE LIST
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

//CREATE LOGIN
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

//READ
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

//CHECK USERNAME AND PASSWORD FOR LOGIN
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

//UPDATE ITEM
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

//UPDATE NUMBER
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

//DELETE ITEM
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await itemModel.findByIdAndDelete(id).exec();
  res.send("deleted");
});

//ASSIGN THE SERVER TO AN ADDRESS
app.listen(3001, () => {
  console.log("server running on port 3001");
});
