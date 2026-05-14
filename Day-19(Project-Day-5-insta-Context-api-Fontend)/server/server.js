const dotenv = require("dotenv")
dotenv.config()
const app = require("./src/app")
const dbConnect = require("./src/config/connectToDB")
const port = process.env.PORT
dbConnect()
app.listen(port, () => {
    console.log(`SERVER IS RUNNING ON PORT NUMBER: ${port}`)
})