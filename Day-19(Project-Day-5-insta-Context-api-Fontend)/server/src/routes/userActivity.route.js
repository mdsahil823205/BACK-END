const express = require("express");
const {
    followUserController,
    unfollowUserController,
} = require("../controllers/userActivity.controller");
const isAuthMidllerware = require("../middleware/aisAuth.middleware");
const userActivityRouter = express.Router();

userActivityRouter.post(
    "/follow/:username",
    isAuthMidllerware,
    followUserController,
);
userActivityRouter.post(
    "/unfollow/:username",
    isAuthMidllerware,
    unfollowUserController,
);

module.exports = userActivityRouter
