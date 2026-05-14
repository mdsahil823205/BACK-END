const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  imageUrl: {
    type: String,
    required: [true, "image_uri is required for creating a post"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "user id is required for creating an post"],
  },
}, { timestamps: true }
);
const postmodel = mongoose.model("post", postSchema);
module.exports = postmodel;
