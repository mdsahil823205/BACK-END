const express = require("express");
const authrouter = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userModel = require("../models/user.model");
authrouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const is_email_exist = await userModel.findOne({ email });
    if (is_email_exist) {
      return res.status(409).json({
        message: "User already exists with this email address",
      });
    }
    const hash = crypto.createHash("md5").update(password).digest("hex");
    const user = await userModel.create({
      name,
      email,
      password: hash,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);

    res.cookie("jwt_register_key", token);
    res.status(201).json({
      message: "Register complete",
      user
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
});

authrouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: `User not exist with this email Id: ${email}`,
      });
    }

    const isvalid_password =
      user.password === crypto.createHash("md5").update(password).digest("hex");
    if (!isvalid_password) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);

    res.cookie("jwt_login_key", token);
    res.status(200).json({
      message: "Login successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
});

module.exports = authrouter;
