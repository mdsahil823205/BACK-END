const mongoose = require("mongoose");
async function ConnectToDB() {
    mongoose.connect(process.env.MONGO_DB_URI).then(() => {
        console.log("database connected")
    })
}
module.exports = ConnectToDB