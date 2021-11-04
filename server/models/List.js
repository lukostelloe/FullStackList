// Create a lists collection that will contain the following schema
// lists user_id, list_id (_id), list name, items_ids.
const mongoose = require("mongoose");

const List = new mongoose.Schema({
  listname: {
    type: String,
    required: true,
  },
  items: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("List", List);
