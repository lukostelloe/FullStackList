// Create a lists collection that will contain the following schema
// lists user_id, list_id (_id), list name, items_ids.
const mongoose = require("mongoose");

const List = new mongoose.Schema({
  items: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("List", List);
