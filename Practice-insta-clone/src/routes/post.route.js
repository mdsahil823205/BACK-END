const express = require("express");
const postRouter = express.Router();
const controller = require("../controller/post.controller");
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
postRouter.post("/", upload.single("image"), controller.postController);
module.exports = postRouter;
