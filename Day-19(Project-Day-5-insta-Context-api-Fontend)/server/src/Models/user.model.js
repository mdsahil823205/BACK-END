const mongoose = require("mongoose")

const userScheme = mongoose.Schema({
    username: {
        type: String,
        unique: [true, "username must be unique"],
        required: [true, "username must be required"]
    },
    email: {
        type: String,
        unique: [true, "email must be unique"],
        required: [true, "email must be required"]
    },
    password: {
        type: String,
        required: [true, "password must be required"]
    },
    bio: {
        type: String,
        default: ""
    },
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/qnt7clkc1/Default_pfp.jpg?updatedAt=1770744648654"
    }
}, {
    timestamps: true,
})
const userModel = mongoose.model("userModel", userScheme)
module.exports = userModel