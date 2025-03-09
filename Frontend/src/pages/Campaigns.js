import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Import auth context
import { useNavigate } from "react-router-dom";
import CampaignCard from "../components/CampaignCard";
import CampaignForm from "./CampaignForm";
import "./Campaigns.css";

function Campaigns() {
    const { user } = useAuth(); // Get user authentication state
    const navigate = useNavigate();

    const [campaigns, setCampaigns] = useState([
        { title: "Help Build a School", description: "Support children's education", goal: 5000, raised: 3000 },
        { title: "Medical Aid for Cancer", description: "Fund cancer treatment for needy patients", goal: 10000, raised: 7500 },
    ]);

    const addCampaign = (campaign) => {
        if (!user) {
            navigate("/login"); // Redirect to login if not authenticated
            return;
        }
        setCampaigns([...campaigns, campaign]);
    };

    return (
        <div className="campaigns-container">
            <h1 className="campaigns-title">Active Campaigns</h1>
            <div className="campaign-list">
                {campaigns.map((campaign, index) => (
                    <CampaignCard key={index} {...campaign} />
                ))}
            </div>

            {/* Show campaign creation only if logged in */}
            {user ? (
                <div className="campaign-form-container">
                    <h2>Start a New Campaign</h2>
                    <CampaignForm onSubmit={addCampaign} />
                </div>
            ) : (
                <button className="btn-create" onClick={() => navigate("/login")}>
                    Login to Create a Campaign
                </button>
            )}
        </div>
    );
}

export default Campaigns;
