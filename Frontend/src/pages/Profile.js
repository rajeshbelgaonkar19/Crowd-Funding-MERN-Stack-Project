import { useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            // Fetch user's donations from backend
            fetch(`/api/donations?userId=${currentUser?.uid}`)
                .then((res) => res.json())
                .then((data) => setDonations(data));
        });
    }, []);

    return (
        <div className="profile-container">
            {user ? (
                <>
                    <h2>Welcome, {user.displayName || user.email}</h2>
                    <h3>Your Contributions</h3>
                    <ul>
                        {donations.map((donation) => (
                            <li key={donation.id}>
                                Donated ${donation.amount} to {donation.campaignName}
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Please log in to view your profile.</p>
            )}
        </div>
    );
};

export default Profile;
