const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: [true, "email already exist"],
  },
  password: {
    type: String,
    required: true,
  },
});
const usermodel = mongoose.model("user_data", userschema);
module.exports = usermodel;
