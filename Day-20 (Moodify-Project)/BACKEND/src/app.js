const express = require("express")

const cookiePasrer = require("cookie-parser")
const app = express()

app.use(cookiePasrer())
app.use(express.json())

const authRouter = require("./routes/auth.route")
app.use("/api/auth", authRouter)
module.exports = app