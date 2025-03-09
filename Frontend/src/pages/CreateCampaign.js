import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";

const baseUrl = process.env.React_baseUrl

const CreateCampaign = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [goal, setGoal] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (!user) {
            alert("You must be logged in to create a campaign.");
            return;
        }

        const campaignData = { title, description, goal, userId: user.uid };
        await fetch(`${baseUrl}/api/campaigns/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(campaignData),
        });

        alert("Campaign created successfully!");
    };

    return (
        <div className="campaign-form">
            <h2>Start a Campaign</h2>
            <input type="text" placeholder="Campaign Title" onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
            <input type="number" placeholder="Goal Amount" onChange={(e) => setGoal(e.target.value)} />
            <button onClick={handleSubmit}>Create Campaign</button>
        </div>
    );
};

export default CreateCampaign;
