require("dotenv").config();
const app = require("./src/app");
const dbconnect = require("./src/config/database");
dbconnect();
app.listen(3000, () => {
  console.log("server is running on port number is", 3000);
});
