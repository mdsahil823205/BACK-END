const mongoose = require("mongoose");
const blacklistSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: [true, "token must be required"],
        },
    },
    { timestamps: true },
);

const blacklistModel = mongoose.model("BLACKLIST-TOKEN", blacklistSchema)

module.exports = blacklistModel