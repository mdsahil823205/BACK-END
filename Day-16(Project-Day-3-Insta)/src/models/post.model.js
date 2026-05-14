const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  imgageUrl: {
    type: String,
    required: [true, "image_uri is required for creating a post"],
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "user id is required for creating an post"],
  },
});
const postmodel = mongoose.model("post", postSchema);
module.exports = postmodel;
