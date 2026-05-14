require("dotenv").config();
const cors = require("cors")
const express = require("express");
const app = express();
const authrouter = require("./routes/auth.route");
const postRouter = require("./routes/post.route");
const cookie_parser = require("cookie-parser");
app.use(express.json());
app.use(cookie_parser());
app.use(cors({
    origin: true,
    credentials: true
}))
app.use("/api/auth", authrouter);
app.use("/api/posts", postRouter);
module.exports = app;
