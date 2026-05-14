const mongoose = require("mongoose")

const likeSchema = mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "postModel",
        required: [true, "post must be required"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: [true, "user must be required"]
    },
}, { timestamps: true })

likeSchema.index({ post: 1, user: 1 }, { unique: true })

const likeModel = mongoose.model("likeModel", likeSchema)

module.exports = likeModel