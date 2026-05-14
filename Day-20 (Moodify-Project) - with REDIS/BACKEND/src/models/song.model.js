const mongoose = require("mongoose");
const songSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    enum: ["happy", "sad", "surprised"],
    message: "enum this is: happy,sad,surprised",
  },
});

const songModel = mongoose.model("Song", songSchema);
module.exports = songModel;
