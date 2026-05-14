const mongoose = require("mongoose");
const userdata = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: [true, "With this email user account already exists"],
  },
  password: String,
});
const usermodel = mongoose.model("userdata", userdata);
module.exports = usermodel;
