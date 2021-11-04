// Create a Items collection that will contain the following schema
// Items user_id, Items_id (_id), Items name, items_ids.
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
