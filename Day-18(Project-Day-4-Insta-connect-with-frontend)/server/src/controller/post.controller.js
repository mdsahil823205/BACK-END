const jwt = require("jsonwebtoken");
const ImageKit = require("@imagekit/nodejs/index.js");
const { toFile } = require("@imagekit/nodejs/index.js");
const postmodel = require("../models/post.model");
const { Folders } = require("@imagekit/nodejs/resources.js");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // Corrected casing
});

// jab user ko apna post create karna ho
async function createPostController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    const file = await client.files.upload({
      file: await toFile(Buffer.from(req.file.buffer), "file"),
      fileName: "test",
      folder: "cohort-2-insta-clone",
    });

    const post = await postmodel.create({
      caption: req.body.caption,
      imageUrl: file.url,
      user: req.user.id,
    });

    res.status(201).json({
      message: "Post created successfully",
      data: post,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
}


// jab user ko apna post dekhna ho jo usne create kiye
const fetchPostController = async (req, res) => {

  const userid = req.user.id;
  const post = await postmodel.find({ user: userid });
  res.status(200).json({
    message: "user post fetch sucessfully",
    post,
  });
};
const fetchPostControllerDetails = async (req, res) => {
  try {

    const postid = req.params.postid;
    const post = await postmodel.findOne({
      _id: postid,
      user: req.user.id,
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
