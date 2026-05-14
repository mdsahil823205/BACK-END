const blacklistModel = require("../models/tokenBlacklist.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const redis = require("../config/cache")
const userAuthentication = async (req,res,next)=>{

  const token = req.cookies.token

  if(!token){
    return res.status(401).json({
      message:"token not found please login"
    })
  }

  const isBlacklisted = await redis.get(token)

  if(isBlacklisted){
    return res.status(401).json({
      message:"token is blacklisted"
    })
  }

  try{

    const decoded = jwt.verify(token,process.env.JWT_KEY)

    req.user = decoded

    next()

  }catch(err){

    return res.status(401).json({
      message:"invalid token"
    })

  }

}

module.exports = userAuthentication;
