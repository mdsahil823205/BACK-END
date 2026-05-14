const jwt = require("jsonwebtoken");
const ImageKit = require("@imagekit/nodejs/index.js");
const { toFile } = require("@imagekit/nodejs/index.js");
const postmodel = require("../models/post.model");
const { Folders } = require("@imagekit/nodejs/resources.js");
const { json } = require("express");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // Corrected casing
});
// jab user ko apna post create karna ho
async function createPostController(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "token not found unauthorize access",
    });
  }
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return res.status(401).json({
      message: "access denied you come with another server unautorize acess",
    });
  }

  const file = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "test",
    folder: "cohort-2-insta-clone",
  });
  const post = await postmodel.create({
    caption: req.body.caption,
    imgageUrl: file.url,
    User: decoded.id,
  });
  res.status(201).json({
    message: "Post created successfully",
    data: file,
  });
}

// jab user ko apna post dekhna ho jo usne create kiye
const fetchPostController = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(409).json({
      message: "token not match",
    });
  }
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: "token not found",
    });
  }
  const userid = decoded.id;
  const post = await postmodel.find({ User: userid });
  res.status(200).json({
    message: "user post fetch sucessfully",
    post,
  });
};
const fetchPostControllerDetails = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "token not match",
      });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      console.log(err);
      res.status(401).json({
        message: "unautorize acess",
      });
    }
    const postid = req.params.postid;
    const post = await postmodel.findOne({
      _id: postid,
      User: decoded.id,
    });
    if (!post) {
      return res.status(404).json({
        message: "post not found you dont have permission too see it",
      });
    }
    res.status(200).json({
      message: `post details fetch sucessfully with same post_id${postid}`,
      post,
    });
  } catch (err) {
    console.log(`error is ${err}`)
    return res.status(500).json({
      message: "Invalid Post ID format"
    })
  }
};
module.exports = {
  createPostController,
  fetchPostController,
  fetchPostControllerDetails,
};
