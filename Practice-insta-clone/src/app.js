const express = require('express');
const app = express();
const authRouter = require("../src/routes/auth.route")
const postRouter = require("../src/routes/post.route")
const cookiepaser = require("cookie-parser")
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)
app.use(cookiepaser())
module.exports = app;