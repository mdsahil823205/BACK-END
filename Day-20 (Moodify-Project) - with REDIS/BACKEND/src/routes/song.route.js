const express = require("express");
const songRouter = express.Router();
const { songPostController, songFetchController } = require("../controller/song.controller");
const upload = require("../middleware/upload.middleware");

songRouter.post("/", upload.single("song"), songPostController);
songRouter.get("/", upload.single("song"), songFetchController);

module.exports = songRouter;
