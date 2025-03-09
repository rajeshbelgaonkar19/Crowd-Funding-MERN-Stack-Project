import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, provider } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css"; // Import the CSS file

function Signup() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        contact: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Email & Password Signup with Verification & MongoDB
    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;
            
            // Update Firebase Display Name
            await updateProfile(user, { displayName: formData.fullName });

            // Send email verification
            await sendEmailVerification(user);
            alert("Verification email sent! Please verify your email before logging in.");

            // Send user data to MongoDB
            await axios.post("http://localhost:5000/api/auth/register", {
                fullName: formData.fullName,
                email: formData.email,
                contact: formData.contact
            });

            navigate("/login"); // Redirect to login page
        } catch (error) {
            setError(error.message);
        }
    };

    // Google Sign-Up & MongoDB Storage
    const handleGoogleSignup = async () => {
        try {
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;

            if (user.emailVerified) {
                // Send Google user data to MongoDB
                await axios.post("http://localhost:5000/api/auth/google-auth", {
                    fullName: user.displayName,
                    email: user.email
                });

                navigate("/"); // Redirect to home if verified
            } else {
                alert("Please verify your email before accessing the platform.");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            {error && <p className="error-text">{error}</p>}
            
            <form className="signup-form" onSubmit={handleSignup}>
                <input 
                    type="text" 
                    name="fullName" 
                    placeholder="Full Name" 
                    value={formData.fullName} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="text" 
                    name="contact" 
                    placeholder="Contact Number" 
                    value={formData.contact} 
                    onChange={handleChange} 
                    required 
                />
                <button type="submit">Sign Up</button>
            </form>

            <p>Or sign up with</p>
            <button className="google-signin-btn" onClick={handleGoogleSignup}>
                Sign Up with Google
            </button>

            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
}

export default Signup;
