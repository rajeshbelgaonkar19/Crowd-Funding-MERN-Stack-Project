const Campaign = require("../models/Campaign");

// Create a new campaign
exports.createCampaign = async (req, res) => {
    try {
        const { title, description, goal } = req.body;

        // Ensure user is authenticated (req.user should exist if authMiddleware is working)
        if (!req.user) {
            return res.status(401).json({ msg: "Unauthorized: User not logged in" });
        }

        // Create a new campaign with the logged-in user as the creator
        const newCampaign = new Campaign({
            title,
            description,
            goal,
            creator: req.user.id, // Assign campaign to the logged-in user
        });

        // Save to database
        await newCampaign.save();
        res.status(201).json({ msg: "Campaign created successfully", campaign: newCampaign });

    } catch (error) {
        console.error("Error creating campaign:", error);
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};

// Get all campaigns
exports.getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find().populate("creator", "name email");

        if (!campaigns.length) {
            return res.status(404).json({ msg: "No campaigns found" });
        }

        res.status(200).json({ msg: "Campaigns retrieved successfully", campaigns });

    } catch (error) {
        console.error("Error fetching campaigns:", error);
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};
