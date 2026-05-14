const blacklistModel = require("../models/tokenBlacklist.model");
const userModel = require("../models/user.model");

const jwt = require("jsonwebtoken");
const userAuthentication = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "token not found please login ",
    });
  }
  const isTokenBlacklist = await blacklistModel.findOne({
    token,
  });
  if (isTokenBlacklist) {
    return res.status(401).json({
      message: "this token is blacklist",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(409).json({
      message: "unAuthorize acces invalid token ",
    });
  }
};

module.exports = userAuthentication;
