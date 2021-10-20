const mongoose = require("mongoose");

const mySchema = new mongoose.Schema({
  done: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
});

const sum = mongoose.model("Shoppinglist", mySchema);
module.exports = sum;
