const postModel = require("../models/post.model");

const ImageKit = require("@imagekit/nodejs/index.js");
const { toFile } = require("@imagekit/nodejs/index.js");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // Corrected casing
});

async function createPostController(req, res) {
  const file = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "test"
  });
  res.status(201).json({
    message: "Post created successfully",
    data: file
  });

}

module.exports = { createPostController };
