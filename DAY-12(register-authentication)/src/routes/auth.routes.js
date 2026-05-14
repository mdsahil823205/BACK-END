const express = require("express");
const authrouter = express.Router();
const usermodel = require("../model/user.model");
const jwt = require("jsonwebtoken");

authrouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const isalreadyexist = await usermodel.findOne({ email });
  if (isalreadyexist) {
    return res.status(400).json({
      message: "user already existes with the same email address",
    });
  }
  const user = await usermodel.create({
    name,
    email,
    password,
  });
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_TOKEN,
  );
  res.cookie("jwt_cookie", token);
  res.status(201).json({
    message: "user registered",
    user,
  });
});
authrouter.get("/register", async (req, res) => {
  const user = await usermodel.find();
  res.status(200).json({
    message: "register data fetch",
    user,
  });
});
module.exports = authrouter;
