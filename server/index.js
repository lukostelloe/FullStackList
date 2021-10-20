const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const summaryModel = require("./models/Shoppinglist");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://lukostelloe:12rudimental@cluster0.w2vqg.mongodb.net/test",
  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
  const days = req.body.day;
  const dones = req.body.done;
  const moods = req.body.mood;

  const summary = new summaryModel({ day: days, done: dones, mood: moods });

  try {
    await summary.save();
    res.send("inserted data");
  } catch (err) {
    console.log(err);
  }
});

app.get("/read", async (req, res) => {
  summaryModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.put("/updatemood", async (req, res) => {
  const newmood = req.body.newmood;
  const id = req.body.id;

  try {
    await summaryModel.findById(id, (err, updatedMood) => {
      updatedMood.mood = newmood;
      updatedMood.save();
      res.send("update");
    });
  } catch (err) {
    console.log(err);
  }
});

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

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await summaryModel.findByIdAndDelete(id).exec();
  res.send("deleted");
});

app.listen(3001, () => {
  console.log("server running on port 3001");
});
