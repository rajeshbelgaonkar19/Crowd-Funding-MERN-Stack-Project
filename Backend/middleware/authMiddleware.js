const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure User model exists
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract token after "Bearer "

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token validity
        req.user = await User.findById(decoded.userId).select("-password"); // Fetch user & exclude password
        
        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }

        next(); // Proceed to next middleware/controller
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
