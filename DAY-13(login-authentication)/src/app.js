const express = require("express");
const app = express();
const authrouter = require("./routes/auth.routes");
const cookie_parser = require("cookie-parser");
app.use(cookie_parser());
app.use(express.json());
app.use("/api/auth", authrouter);
module.exports = app;
