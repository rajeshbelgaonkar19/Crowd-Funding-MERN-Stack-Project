import "./CampaignCard.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";

function CampaignCard({ title, description, goal, raised }) {
    const navigate = useNavigate();

    const handleDonateClick = () => {
        if (auth.currentUser) {
            navigate("/donate");
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="campaign-card">
            <h2>{title}</h2>
            <p>{description}</p>
            <p><strong>Goal:</strong> ${goal}</p>
            <p><strong>Raised:</strong> ${raised}</p>
            <button className="donate-btn" onClick={handleDonateClick}>Donate</button>
        </div>
    );
}

export default CampaignCard;
