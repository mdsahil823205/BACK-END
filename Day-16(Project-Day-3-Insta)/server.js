const app = require("./src/app");
const connectDB = require("./src/config/database");
require("dotenv").config();
const cookie_parser = require("cookie-parser");
app.use(cookie_parser());
connectDB();
const port = 3000;
app.listen(port, () => {
    console.log(`server is running at port ${port}`);
});
