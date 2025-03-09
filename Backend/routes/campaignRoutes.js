const express = require("express");
const router = express.Router();
const { createCampaign, getCampaigns } = require("../controllers/campaignController");
const authMiddleware = require("../middleware/authMiddleware"); // Ensure this file exists and is correct

// Define routes
router.post("/create", authMiddleware, createCampaign); // Ensure authMiddleware is correctly implemented
router.get("/", getCampaigns);

module.exports = router;
