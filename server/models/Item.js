// Create a Items collection that will contain the following schema
// Items user_id, Items_id (_id), Items name, items_ids.
const mongoose = require("mongoose");

const Items = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  list_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Items", Items);
