const mongoose = require("mongoose");
const dbconnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connect to database")
    } catch (error) {
        console.log(`not connected to database ${error}`)
    }
}
module.exports = dbconnect