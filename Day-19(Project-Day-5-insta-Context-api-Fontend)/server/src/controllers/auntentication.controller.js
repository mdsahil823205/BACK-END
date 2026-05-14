const userModel = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
    try {
        const { email, username, password, bio, profileImage } = req.body;
        const isAlreadyExist = await userModel.findOne({
            $or: [{ username }, { email }],
        });
        if (isAlreadyExist) {
            return res.status(409).json({
                message: `user already exist`,
            });
        }
        const hash = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            username: username,
            email: email,
            password: hash,
            bio,
            profileImage,
        });
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            process.env.JWT_KEY,
            { expiresIn: "1d" },
        );

        res.cookie("token", token);
        res.status(200).json({
            sucess: true,
            message: "user register sucessfullly",
            user
        });
    } catch (error) {
        return res.status(500).json({
            messgae: `this error come from user register ${error.message}`
        });
    }
};

const loginController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await userModel.findOne({
            $or: [{ username }, { email }],
        });
        if (!user) {
            return res.status(404).json({
                message: `user not found please register your account`,
            });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(409).json({
                message: "invalid password please enter a correct password",
            });
        }
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            process.env.JWT_KEY,
            { expiresIn: "1d" },
        );
        res.cookie("token", token)
        return res.status(200).json({
            sucess: true,
            message: "user login sucessfully",
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage

        })
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: `this error come from userlogin ${error.message}`
        })
    }
};

module.exports = { registerController, loginController };
