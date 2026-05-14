const mongoose = require("mongoose");

const postsSchmea = mongoose.Schema({
  caption: {
    default: "",
    type: String,
  },
  image_url: {
    type: String,
    required: [true, "image is required to craating a post"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userdata",
    required: [true, "user id is required for creating an post"],
  },
});
const postModel = mongoose.model("user_post", postsSchmea);
module.exports = postModel;
