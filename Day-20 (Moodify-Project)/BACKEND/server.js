const app = require("./src/app")
require("dotenv").config()
const connecDB = require("./src/config/connectDb")
const port = 3000
connecDB()
app.listen(port, () => {
    console.log("server is running")
})