const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());





// yaha pe hum jitna bhi sab routes hai usko requires kiye hai
const authenticationRouter = require("./routes/aunthentication.route");
const postRouter = require("./routes/post.route");
const userActivityRouter = require("./routes/userActivity.route");

// aur yaha pe use kiye hai sabhi  routes ko
app.use("/api/auth", authenticationRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userActivityRouter);


module.exports = app;
