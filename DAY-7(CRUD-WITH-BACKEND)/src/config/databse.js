const mongoose = require("mongoose");
function connectdb() {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("database connected")
    })
}
module.exports = connectdb