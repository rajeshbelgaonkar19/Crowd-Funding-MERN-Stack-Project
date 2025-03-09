import { createContext, useContext, useEffect, useState } from "react";
import { auth, provider } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Ensures the app does not flicker while checking auth status

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Google Sign-In
    const googleSignIn = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Google Sign-In Error:", error.message);
        }
    };

    // Logout
    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null); // Ensures UI updates correctly after logout
        } catch (error) {
            console.error("Logout Error:", error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ user, googleSignIn, logout }}>
            {!loading && children} {/* Prevent rendering UI until auth state is checked */}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
