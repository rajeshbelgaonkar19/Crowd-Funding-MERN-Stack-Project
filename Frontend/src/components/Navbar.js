import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import "./Navbar.css";

function Navbar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Track user authentication state
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">Crowdfunding</div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/campaigns">Campaigns</Link></li>
                {!user ? (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/start-campaign">Start a Campaign</Link></li>
                        <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
