import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import Payment from "../components/Payment";

function Donate() {
    const { title } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.currentUser) {
            navigate("/login"); // Redirect if not authenticated
        }
    }, [navigate]);

    return (
        <div>
            <h2>Donate to {title}</h2>
            <p>Thank you for supporting this campaign!</p>
            {/* Add Payment Processing Logic Here */}
        </div>
    );
}

export default Donate;
