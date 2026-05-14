const express = require("express")
const { registerController, loginController, getMeController, logoutController } = require("../controller/auth.controller")
const userAuthentication = require("../middleware/userAuth.middleware")
const authRouter = express.Router()

authRouter.post("/register", registerController)
authRouter.post("/login", loginController)
authRouter.get("/get-me", userAuthentication, getMeController)
authRouter.get("/logout", userAuthentication, logoutController)
module.exports = authRouter