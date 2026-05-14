require("dotenv").config()
const dbconnect = require("./src/config/database")
const app = require('./src/app');
dbconnect()
const port = process.env.PORT
app.listen(port, () => {
    console.log(`server is running on port number is ${port}`)
})