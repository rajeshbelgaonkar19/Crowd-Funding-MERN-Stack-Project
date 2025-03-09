const express = require("express");
const { getProfile, updateProfile } = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);  // ✅ Fetch User Profile
router.put("/profile", authMiddleware, updateProfile);  // ✅ Update User Profile

module.exports = router;
