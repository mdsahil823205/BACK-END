const express = require('express');
const authRouter = express.Router()
const controller = require("../controller/auth.controller")
authRouter.post("/register", controller.registerController)
authRouter.post("/login", controller.logincontroller)
module.exports = authRouter