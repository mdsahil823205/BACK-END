const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { username, email, password, bio, Imageurl } = req.body;

    const isalreadyexist = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (isalreadyexist) {
      const field = isalreadyexist.email === email ? "email" : "username";
      return res.status(409).json({
        message: `${field} already exists`,
        success: false,
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hash,
      bio: bio || "",
      Imageurl:
        Imageurl ||
        "https://ik.imagekit.io/qnt7clkc1/Default_pfp.jpg?updatedAt=1770744648654",
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("token", token);

    res.status(201).json({
      message: "account created successfully",
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};
const logincontroller = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const isvaliduser = await userModel.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (!isvaliduser) {
      const field = isvalidpassword.email
        ? `this email id:${email}`
        : `this username:${username}`;
      res.status(400).json({
        message: `user is not register account with this ${field}`,
        success: false,
      });
    }
    const isvalidpassword = await bcrypt.compare(
      password,
      isvaliduser.password,
    );
    if (!isvalidpassword) {
      return res.status(400).json({
        message: "invalid password",
        success: false,
      });
    }
    const token = jwt.sign(
      {
        id: isvaliduser._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" },
    );
    res.cookie("token", token);
    res.status(200).json({
      message: "login successully",
      success: true,
      username: isvaliduser.username,
      email: isvaliduser.email,
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};
module.exports = {
  registerController,
  logincontroller,
};
