// Create a lists collection that will contain the following schema
// lists user_id, list_id (_id), list name, items_ids.
const mongoose = require("mongoose");

const List = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  listname: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("List", List);
