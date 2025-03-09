const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { fullName, email, username, password, contact, profileImage } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ 
            fullName, 
            email, 
            username, // Ensure username is stored
            password: hashedPassword, 
            contact, 
            profileImage 
        });

        await user.save();

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({ token, user });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ msg: "Server error", error });
    }
};

// ✅ Google OAuth Registration/Login
exports.googleSignup = async (req, res) => {
    const { email, fullName, googleId, profileImage } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                fullName,
                email,
                googleId,
                profileImage,
                username: fullName.toLowerCase().replace(/\s/g, ""), // Generate username from full name
                password: null // No password required for Google auth
            });
            await user.save();
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user });
    } catch (error) {
        console.error("Google Signup Error:", error);
        res.status(500).json({ msg: "Server error", error });
    }
};

// ✅ Fetch User Profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        if (!user) return res.status(404).json({ msg: "User not found" });

        res.json(user);
    } catch (error) {
        console.error("Profile Fetch Error:", error);
        res.status(500).json({ msg: "Server error", error });
    }
};
