require("dotenv").config();
const app = require("./src/app");
const mongoose = require("mongoose");
const port = 3000;
async function dbconnect() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("database connected");
}
dbconnect();
app.listen(() => {
    console.log("server is runnimg port on", port);
});
