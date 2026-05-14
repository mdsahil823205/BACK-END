const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
    caption: {
        type: String,
        default: ''
    },
    file: {
        type: String,
        required: [true, "file must be required"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: [true, "user must be required"]
    }
});
const postModel = mongoose.model("postModel", postSchema)

module.exports = postModel