import React from "react";

const Payment = ({ amount, userEmail }) => {
    const handlePayment = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/payments/pay", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount,
                    email: userEmail,
                    orderId: `ORD_${Date.now()}`
                }),
            });

            const data = await response.json();
            if (data.success) {
                const form = document.createElement("form");
                form.method = "post";
                form.action = "https://securegw-stage.paytm.in/order/process"; // Staging URL

                Object.keys(data.params).forEach(key => {
                    const input = document.createElement("input");
                    input.type = "hidden";
                    input.name = key;
                    input.value = data.params[key];
                    form.appendChild(input);
                });

                document.body.appendChild(form);
                form.submit();
            } else {
                alert("Payment initiation failed!");
            }
        } catch (error) {
            console.error("Payment Error:", error);
            alert("Error processing payment.");
        }
    };

    return (
        <button onClick={handlePayment} className="donate-button">
            Donate ₹{amount}
        </button>
    );
};

export default Payment;
