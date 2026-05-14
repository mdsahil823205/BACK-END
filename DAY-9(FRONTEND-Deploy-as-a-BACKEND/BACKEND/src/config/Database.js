const mongoose = require("mongoose");
function dbConnect() {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("database connected");
  });
}
module.exports = dbConnect;
