const mongoose = require("mongoose");
function dbconnect() {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log(`database connected`)
    })
}
module.exports = dbconnect
