const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, "this email is already exist"],
        required: [true, "email is required"],
    },
    username: {
        type: String,
        unique: [true, "this username is already exist"],
        required: [true, "username is required"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    bio: String,
    Imageurl: {
        type: String,
        default:
            "https://ik.imagekit.io/qnt7clkc1/Default_pfp.jpg?updatedAt=1770744648654",
    },
});

const userModel = mongoose.model("userdata", userSchema);
module.exports = userModel;
