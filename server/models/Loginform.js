const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const loginsum = mongoose.model("Loginform", loginSchema);
module.exports = loginsum;
