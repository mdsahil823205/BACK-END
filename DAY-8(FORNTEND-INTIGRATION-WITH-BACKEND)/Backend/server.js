require("dotenv").config();
const app = require("./src/app");
const ConnectToDB = require("./src/config/database")
ConnectToDB()
const port = 3000;
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});
