const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const authrouter = require("../routes/auth.route");

const register = async (req, res) => {
    const { username, email, password, bio, profileImage } = req.body;
    const isalreadyExist = await userModel.findOne({
        $or: [{ email }, { username }],
    });
    if (isalreadyExist) {
        if (isalreadyExist.email === email) {
            return res.status(409).json({
                message: "email already exist",
            });
        }

        if (isalreadyExist.username === username) {
            return res.status(409).json({
                message: "username already exist",
            });
        }
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex");
    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profileImage,
    });
    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" },
    );
    res.cookie("token", token);
    res.status(201).json({
        message: "user registered successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage,
        },
    });
}

const login = async (req, res) => {
    const { username, email, password } = req.body;
    const user = await userModel.findOne({
        $or: [{ email: email }, { username: username }],
    });
    if (!user) {
        return res.status(404).json({
            message: "user not found",
        });
    }
    const hash = crypto.createHash("sha256").update(password).digest("hex");
    const isvalidpassword = user.password === hash;
    if (!isvalidpassword) {
        return res.status(401).json({
            message: "invalid password",
        });
    }
    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" },
    );
    res.cookie("token", token);
    res.status(200).json({
        message: "user logged in successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage,
        },
    });
};
module.exports = authcontroller = {
    register,
    login,
};