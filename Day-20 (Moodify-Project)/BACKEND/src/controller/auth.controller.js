const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/tokenBlacklist.model");

const registerController = async (req, res) => {
    const { username, email, password } = req.body;

    const isAlreadExists = await userModel.findOne({
        $or: [{ username }, { email }],
    });

    if (isAlreadExists) {
        return res.status(409).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash,
    });

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_KEY,
        { expiresIn: "3d" },
    );

    res.cookie("token", token);
    return res.status(201).json({
        message: "user registered successfully",
        user: { id: user._id, username, email },
    });
};

const loginController = async (req, res) => {
    const { username, email, password } = req.body;

    const user = await userModel
        .findOne({
            $or: [{ username }, { email }],
        })
        .select("+password");

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_KEY,
        { expiresIn: "3d" },
    );

    res.cookie("token", token);
    return res.status(200).json({
        message: "Login successful",
        user: { id: user._id, username: user.username, email: user.email },
    });
};

const getMeController = async (req, res) => {
    const user = await userModel.findById(req.user.id);
    if (!user) {
        return res.status(404).json({
            message: "user not found",
        });
    }

    return res.status(200).json({
        message: "user fetch sucessfully",
        user,
    });
};


const logoutController = async (req, res) => {
    token = req.cookies.token
    res.clearCookie("token")

    if (token) {
        await blacklistModel.create({ token });
    }

    return res.status(200).json({
        message: "logout sucessfully"
    })
}
module.exports = { registerController, loginController, getMeController, logoutController };
