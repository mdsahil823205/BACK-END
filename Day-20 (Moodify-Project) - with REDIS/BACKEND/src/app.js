const express = require("express");
const cors = require("cors");
const cookiePasrer = require("cookie-parser");
const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(cookiePasrer());
app.use(express.json());

const authRouter = require("./routes/auth.route");
app.use("/api/auth", authRouter);

const songRouter = require("./routes/song.route");
app.use("/api/songs", songRouter);
module.exports = app;
