import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebaseConfig"; // Ensure provider is correctly imported
import { useAuth } from "../context/AuthContext";

const GoogleSignIn = () => {
    const { setUser } = useAuth(); // Get setUser from AuthContext

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log("User signed in:", result.user);
            setUser(result.user); // Store user in context for global access
        } catch (error) {
            console.error("Google Sign-In Error:", error.message);
        }
    };

    return (
        <button onClick={handleGoogleSignIn} className="google-signin-btn">
            Sign Up with Google
        </button>
    );
};

export default GoogleSignIn;
