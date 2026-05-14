// 1. FIXED: Import the MODEL, not the controller
const likeModel = require("../Models/likes.model");
const postModel = require("../Models/post.model");

const likeController = async (req, res) => {
    try {
        const userId = req.user.id;
        const postId = req.params.postId;

        const post = await postModel.findById(postId);
        if (!post) return res.status(404).json({ message: "post not found" });

        // Using create directly. If user already liked, the Unique Index 
        // in your schema will throw an error caught by the catch block.
        const like = await likeModel.create({
            user: userId,
            post: postId
        });

        return res.status(201).json({ message: "post liked successfully", like });
    } catch (error) {
        // Handle duplicate like error (Mongo error code 11000)
        if (error.code === 11000) return res.status(400).json({ message: "Already liked" });
        return res.status(500).json({ message: error.message });
    }
};

const disLikeController = async (req, res) => {
    try {
        const userId = req.user.id;
        const postId = req.params.postId;

        // 2. FIXED: Search by BOTH user and post to find the specific like
        const deletedLike = await likeModel.findOneAndDelete({
            user: userId,
            post: postId
        });

        if (!deletedLike) {
            return res.status(400).json({ message: "post wasn't liked" });
        }

        res.status(200).json({ message: "disliked successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getFeedController = async (req, res) => {
    try {
        const userId = req.user.id;
        // 3. FIXED: Fetch posts and then map through them to check like status
        const rawPosts = await postModel.find({}).populate("user").lean();

        const feed = await Promise.all(rawPosts.map(async (post) => {
            const likeExists = await likeModel.findOne({
                user: userId,
                post: post._id
            });

            // Add a temporary field 'isLiked' to the object
            return { ...post, isLiked: !!likeExists };
        }));

        res.status(200).json({ message: "posts fetched", feed });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { likeController, disLikeController, getFeedController }