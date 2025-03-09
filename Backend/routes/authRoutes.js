const express = require("express");
const { register, googleSignup } = require("../controllers/authController");
const { getProfile, updateProfile } = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware"); // Middleware for protected routes

const router = express.Router();

// ✅ Email & Password Signup
router.post("/register", register);

// ✅ Google OAuth Signup/Login
router.post("/google-signup", googleSignup);

// ✅ Fetch User Profile (Protected)
router.get("/profile", authMiddleware, getProfile);

// ✅ Update User Profile (Protected)
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;
