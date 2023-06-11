const functions = require("firebase-functions");

const stripe = require("stripe")(
  "sk_test_51LrHfaCHHxU4hGNymNaN7PP7UY3i53MTFB9WgC06uHBmUXKRjV0UrQTnvC6d9B3Y2iD5kFPBMNjgR8nXgrzhEwow00t05FqzK7"
);

exports.createStripeCheckout = functions.https.onRequest(async (req, res) => {
  try {
    const { name, amount } = req.body;
    if (!name) return res.status(400).json({ message: "Please Enter a name" });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
      metadata: { name },
    });
    const clientSecret = paymentIntent.client_secret;
    res.json({
      message: "Payment Request Created",
      clientSecret: clientSecret,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
