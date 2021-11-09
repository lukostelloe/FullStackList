const mongoose = require("mongoose");

const Items = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Items", Items);
