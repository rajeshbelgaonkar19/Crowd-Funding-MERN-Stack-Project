import React from "react";
import "./Home.css";

function Home() {
    return (
        <div className="home">
            {/* Hero Section */}
            <div className="hero-section">
                <h1>Welcome to Crowdfunding Platform</h1>
                <p>Support innovative projects and help make dreams a reality.</p>
                <button className="hero-btn">Explore Campaigns</button>
            </div>

            {/* Fundraising Statistics */}
            <div className="fund-stats">
                <p>💰 Funds Raised: $5,000,000</p>
                <p>🙌 Active Donors: 10,000</p>
                <p>🎯 Successful Campaigns: 1,000</p>
                <button className="more-details-btn">More Details</button>
            </div>

            {/* Features Section */}
            <div className="features">
                <div className="feature">
                    <h3>🌍 Global Reach</h3>
                    <p>Back projects from all around the world and help bring ideas to life.</p>
                </div>
                <div className="feature">
                    <h3>🔒 Secure Transactions</h3>
                    <p>We ensure safe and transparent funding with trusted payment gateways.</p>
                </div>
                <div className="feature">
                    <h3>💡 Innovative Ideas</h3>
                    <p>Support cutting-edge projects in technology, art, science, and more.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
