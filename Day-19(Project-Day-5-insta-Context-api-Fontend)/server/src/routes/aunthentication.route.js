const express = require("express")
const { registerController, loginController } = require("../controllers/auntentication.controller")
const authenticationRouter = express.Router()

authenticationRouter.post("/register", registerController)
authenticationRouter.post("/login", loginController)

module.exports = authenticationRouter