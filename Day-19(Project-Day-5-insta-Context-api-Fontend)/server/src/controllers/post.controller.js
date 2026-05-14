const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs"); // Naye version ka helper
const jwt = require("jsonwebtoken");
const postModel = require("../Models/post.model");
const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const CreatePostController = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        // Naye Version ka Upload Logic
        const uploadedFile = await client.files.upload({
            file: await toFile(req.file.buffer, req.file.image), // Buffer helper
            fileName: `post}`,
            folder: "insta-clone", // Note: Sirf 'folder' use karein, 'folderName' nahi
        });

        const post = await postModel.create({
            caption: req.body.caption,
            file: uploadedFile.url,
            user: req.user.id,
        });

        return res.status(201).json({
            message: "Upload successful",
            imageUrl: uploadedFile.url,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// iss contoller main user ka sab post dekhenge
const getPostController = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(404).json({
                message: `this user not found: ${userId}`,
            });
        }

        const post = await postModel
            .find({
                user: userId,
            })
            .sort({ creatAt: -1 });
        res.status(200).json({
            status: true,
            message: `post fetch sucessfully`,
            post,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// iss conroller main user ka ek individual post ka details dekhenge
const getPostDetailsController = async (req, res) => {
    try {
        const userId = req.user.id;
        const postId = req.params.postId;

        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: `this post is not exist in our database`,
            });
        }
        const validUser = post.user.toString() == userId;
        if (!validUser) {
            return res.status(403).json({
                message: `Forbidden Content `,
            });
        }
        res.status(200).json({
            message: "user post detail fetch sucessfully",
            post,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    CreatePostController,
    getPostController,
    getPostDetailsController,
};
