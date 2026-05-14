const express = require("express")
const postRouter = express.Router()
const postcontroller = require("../controller/post.controller")
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
postRouter.post("/", upload.single("image"), postcontroller.createPostController)

module.exports = postRouter