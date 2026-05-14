const express = require("express")
const postRouter = express.Router()
const postcontroller = require("../controller/post.controller")
const indentifyerUser = require("../middleware/auth.middleware")
const multer = require("multer")
const storage = multer.memoryStorage()


const upload = multer({ storage: storage })


postRouter.post("/", indentifyerUser, upload.single("image"), postcontroller.createPostController)


postRouter.get("/", indentifyerUser, postcontroller.fetchPostController)


postRouter.get("/details/:postid", indentifyerUser, postcontroller.fetchPostControllerDetails)
module.exports = postRouter