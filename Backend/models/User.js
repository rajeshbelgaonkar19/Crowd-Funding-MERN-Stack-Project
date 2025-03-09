const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String
        // Not required when using passport-local-mongoose
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."]
    },
    fullName: { // Ensured consistent naming
        type: String,
        required: true
    },
    contact: {
        type: String, // Changed to String for flexibility (to store +91, etc.)
        default: null
    },
    profileImage: {
        type: String,
        default: ""
    },
    googleId: { 
        type: String, 
        default: null 
    },
    contributedCampaigns: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Campaign" 
    }], // Tracks campaign contributions
    boards: {
        type: Array,
        default: []
    },
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
}, { timestamps: true });

// Use passport-local-mongoose for authentication
UserSchema.plugin(plm);

module.exports = mongoose.model("User", UserSchema);
