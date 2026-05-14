require("dotenv").config();
const dbConnect = require("./src/config/Database");
const app = require("./src/app");
const port = 3000;
dbConnect();

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
