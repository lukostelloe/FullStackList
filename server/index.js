const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const summaryModel = require("./models/Shoppinglist");
const loginModel = require("./models/Loginform");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://lukostelloe:12rudimental@cluster0.w2vqg.mongodb.net/test",
  {
    useNewUrlParser: true,
  }
);

//CREATE

app.post("/insert", async (req, res) => {
  const numbers = req.body.number;
  const dones = req.body.done;

  const summary = new summaryModel({ number: numbers, done: dones });

  try {
    await summary.save();
    res.send(summary);
  } catch (err) {
    console.log(err);
  }
});

app.post("/insertlogin", async (req, res) => {
  const users = req.body.username;
  const passwords = req.body.password;

  const summarylogin = new loginModel({ username: users, password: passwords });

  try {
    await summarylogin.save();
    res.send(summarylogin);
  } catch (err) {
    console.log(err);
  }
});

//READ

app.get("/read", async (req, res) => {
  summaryModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

//UPDATE

app.put("/updatedone", async (req, res) => {
  const newdone = req.body.newdone;
  const id = req.body.id;

  try {
    await summaryModel.findById(id, (err, updatedDone) => {
      updatedDone.done = newdone;
      updatedDone.save();
      res.send("update");
    });
  } catch (err) {
    console.log(err);
  }
});

app.put("/updatenumber", async (req, res) => {
  const newnumber = req.body.newnumber;
  const id = req.body.id;

  try {
    await summaryModel.findById(id, (err, updatedNumber) => {
      updatedNumber.number = newnumber;
      updatedNumber.save();
      res.send("update");
    });
  } catch (err) {
    console.log(err);
  }
});

//DELETE

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await summaryModel.findByIdAndDelete(id).exec();
  res.send("deleted");
});

app.listen(3001, () => {
  console.log("server running on port 3001");
});
