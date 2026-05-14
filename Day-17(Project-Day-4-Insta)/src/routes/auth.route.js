const express = require("express");
const authrouter = express.Router();
const authcontoller = require("../controller/auth.controller");
authrouter.post("/register", authcontoller.register);
authrouter.post("/login", authcontoller.login);
module.exports = authrouter;
