require("dotenv").config()
const app = require("./src/app")
const port = 3000
const dbconnect = require("./src/config/Databse")
dbconnect()
app.listen(port, () => {
    console.log(`server is running on ${port}`)
})