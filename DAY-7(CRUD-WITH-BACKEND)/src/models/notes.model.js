const mongoose = require("mongoose");
const noteschema = mongoose.Schema({
    title: String,
    description: String,
});
const notemodel = mongoose.model("notes", noteschema);

module.exports = notemodel