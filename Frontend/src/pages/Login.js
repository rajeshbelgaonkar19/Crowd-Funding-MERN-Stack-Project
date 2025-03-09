import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import GoogleSignIn from "../components/GoogleSignIn"; // ✅ Add this line here
import "./Login.css"; // Ensure a CSS file is created for better styling

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            if (!user.emailVerified) {
                setError("Please verify your email before logging in.");
                return;
            }
            
            navigate("/"); // Redirect to home after login
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        setError("");
        try {
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;
            
            if (!user.email) {
                setError("Google account verification failed.");
                return;
            }
            
            navigate("/"); // Redirect to home after login
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-text">{error}</p>}
            <form onSubmit={handleLogin} className="login-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <button onClick={handleGoogleSignIn} className="google-signin-btn">
                Sign in with Google
            </button>
            <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
    );
}

export default Login;
