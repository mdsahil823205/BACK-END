const indentifyerUser = async (req, res, next) => {
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
    req.user = decoded
    next()
}
module.exports = indentifyerUser