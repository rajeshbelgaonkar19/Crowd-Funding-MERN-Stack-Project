const checksum_lib = require("paytmchecksum");
const config = require("../config/paytmConfig");

exports.initiatePayment = async (req, res) => {
    try {
        const { amount, email, orderId } = req.body;

        let params = {
            MID: config.PAYTM_MID,
            WEBSITE: config.PAYTM_WEBSITE,
            CHANNEL_ID: config.PAYTM_CHANNEL_ID,
            INDUSTRY_TYPE_ID: config.PAYTM_INDUSTRY_TYPE_ID,
            ORDER_ID: orderId,
            CUST_ID: email,
            TXN_AMOUNT: amount,
            CALLBACK_URL: config.PAYTM_CALLBACK_URL
        };

        const checksum = await checksum_lib.generateSignature(params, config.PAYTM_MERCHANT_KEY);
        params.CHECKSUMHASH = checksum;

        res.json({ success: true, params });
    } catch (error) {
        console.error("Payment Initiation Error:", error);
        res.status(500).json({ success: false, message: "Payment initiation failed" });
    }
};

exports.paymentCallback = async (req, res) => {
    try {
        const receivedData = req.body;
        const paytmChecksum = receivedData.CHECKSUMHASH;
        delete receivedData.CHECKSUMHASH;

        const isValidChecksum = await checksum_lib.verifySignature(receivedData, config.PAYTM_MERCHANT_KEY, paytmChecksum);

        if (isValidChecksum) {
            if (receivedData.STATUS === "TXN_SUCCESS") {
                // Save transaction details in MongoDB
                res.json({ success: true, message: "Payment Successful", data: receivedData });
            } else {
                res.json({ success: false, message: "Payment Failed", data: receivedData });
            }
        } else {
            res.status(400).json({ success: false, message: "Checksum Verification Failed" });
        }
    } catch (error) {
        console.error("Payment Callback Error:", error);
        res.status(500).json({ success: false, message: "Callback processing failed" });
    }
};
