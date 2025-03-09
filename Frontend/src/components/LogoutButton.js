import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert("Logged out successfully!");
        } catch (error) {
            console.error("Logout Error:", error.message);
        }
    };

    return (
        <button onClick={handleLogout} className="logout-btn">Logout</button>
    );
};

export default LogoutButton;
