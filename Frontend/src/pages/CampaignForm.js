import React, { useState } from "react";
import "./Campaigns.css"; // Keep styling consistent

function CampaignForm({ onSubmit }) {
    const [campaign, setCampaign] = useState({
        title: "",
        description: "",
        goalAmount: "",
        category: "",
    });

    const handleChange = (e) => {
        setCampaign({ ...campaign, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(campaign);
    };

    return (
            <form className="campaign-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Campaign Title"
                    value={campaign.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={campaign.description}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="goalAmount"
                    placeholder="Goal Amount"
                    value={campaign.goalAmount}
                    onChange={handleChange}
                    required
                />
                <select name="category" value={campaign.category} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    <option value="Technology">Technology</option>
                    <option value="Education">Education</option>
                </select>
                <button type="submit" className="btn-submit">Create Campaign</button>
            </form>
    );
}

export default CampaignForm;
