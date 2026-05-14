const express = require("express");
const app = express();
const authrouter = require("./routes/auth.route");
const cookie_parser = require("cookie-parser");
app.use(express.json());
app.use("/api/auth", authrouter);
app.use(cookie_parser());
module.exports = app;
