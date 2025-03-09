import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Campaigns from "./pages/Campaigns";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Donate from "./pages/Donate";
import CreateCampaign from "./pages/CreateCampaign";
import Footer from "./components/Footer";
import { auth, onAuthStateChanged } from "./firebase/firebaseConfig";
import "./App.css";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // Allow only verified email users or Google sign-in users
            if (currentUser && (currentUser.emailVerified || currentUser.providerData[0]?.providerId === "google.com")) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Restrict access to only verified users */}
                <Route 
                    path="/donate/:title" 
                    element={user ? <Donate /> : <Login />} 
                />
                <Route 
                    path="/create-campaign" 
                    element={user ? <CreateCampaign /> : <Login />} 
                />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
