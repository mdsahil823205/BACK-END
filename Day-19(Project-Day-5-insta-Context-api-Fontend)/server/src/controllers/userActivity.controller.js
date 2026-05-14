const followModel = require("../Models/follower.model");
const userModel = require("../Models/user.model");

const followUserController = async (req, res) => {
    try {
        // 1. Consistent rahein: ID use karein (req.user.id middleware se aayega)
        const followerId = req.user.id;
        const followeeUsername = req.params.username;

        // 2. Jisko follow karna hai uska data nikalna padega (uski ID ke liye)
        const followeeUser = await userModel.findOne({ username: followeeUsername });

        if (!followeeUser) {
            return res.status(404).json({ message: "User does not exist" });
        }

        // 3. Self-follow check (ID level par)
        if (followerId.toString() === followeeUser._id.toString()) {
            return res.status(400).json({ message: "You cannot follow yourself" });
        }

        // 4. Already following check
        const isAlreadyFollowing = await followModel.findOne({
            follower: followerId,
            followee: followeeUser._id, // Store IDs, not usernames
        });

        if (isAlreadyFollowing) {
            return res.status(200).json({ message: "Already following this user" });
        }

        // 5. Create Follow Record
        const followRecord = await followModel.create({
            follower: followerId,
            followee: followeeUser._id,
        });

        return res.status(201).json({
            message: `Following ${followeeUsername}`,
            follow: followRecord,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const unfollowUserController = async (req, res) => {
    try {
        const followerId = req.user.id;
        const followeeUsername = req.params.username;

        const followeeUser = await userModel.findOne({ username: followeeUsername });
        if (!followeeUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Search and Delete
        const unfollowed = await followModel.findOneAndDelete({
            follower: followerId,
            followee: followeeUser._id
        });

        if (!unfollowed) {
            return res.status(400).json({ message: "You are not following this user" });
        }

        return res.status(200).json({
            message: `Unfollowed ${followeeUsername} successfully`
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { followUserController, unfollowUserController };
