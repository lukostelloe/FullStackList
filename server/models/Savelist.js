const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  list: {
    type: Array,
    required: true,
  },
});

const sumlist = mongoose.model("Savelist", listSchema);
module.exports = sumlist;
