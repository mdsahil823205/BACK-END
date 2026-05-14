const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const postRouter = express.Router();
const { CreatePostController, getPostController, getPostDetailsController } = require("../controllers/post.controller");
const isAuthMidllerware = require("../middleware/aisAuth.middleware");
const { likeController, getFeedController, disLikeController } = require("../controllers/likes.controller");

// iss routes se hum post ko create karayenge 
postRouter.post("/", upload.single("image"), isAuthMidllerware, CreatePostController);

// iss routes se hum user ka sab  post ko dekhenge 
postRouter.get("/", isAuthMidllerware, getPostController)

// is routes se hum ek individual post ka details dekhenge 
postRouter.get("/details/:postId", isAuthMidllerware, getPostDetailsController)


// yeh jo section hai like and dislike ka 
postRouter.post("/like/:postId", isAuthMidllerware, likeController)
postRouter.post("/dislike/:postId", isAuthMidllerware, disLikeController)

// yeh jo section hai pura user ka sab post aayega isme 
postRouter.get("/feed", isAuthMidllerware, getFeedController)


module.exports = postRouter