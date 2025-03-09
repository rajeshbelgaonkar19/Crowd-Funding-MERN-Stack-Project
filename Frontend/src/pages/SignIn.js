import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
            navigate("/campaigns"); // Redirect after login
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="auth-container">
            <h2>Sign In</h2>
            {user ? (
                <p>You're already signed in.</p>
            ) : (
                <button onClick={handleLogin}>Sign in with Google</button>
            )}
        </div>
    );
};

export default SignIn;