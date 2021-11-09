const mongoose = require("mongoose");

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", User);

//THIS IS FOR THE LIST SCHEMA
// Create a Items collection that will contain the following schema
// Items user_id, Items_id (_id), Items name, items_ids.
