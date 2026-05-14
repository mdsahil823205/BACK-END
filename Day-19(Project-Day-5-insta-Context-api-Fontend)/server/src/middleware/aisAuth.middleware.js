const jwt = require("jsonwebtoken");
const isAuthMidllerware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({
                message: `unAuthorize access token not found please login to generate token `,
            });
        }
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_KEY);
        } catch (error) {
            return res.status(401).json({
                message: "user come from another server",
            });
        }
        req.user = {};
        req.user.id = decoded.id || decoded;
        console.log(req.user.id);
        next();
    } catch (error) {
        console.log(`this error come from isAuthmiddleware: ${error}`)
    }
};

module.exports = isAuthMidllerware;
