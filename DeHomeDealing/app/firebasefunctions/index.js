const functions = require("firebase-functions");
const { paymentRequest } = require("./pay");

const stripe = require("stripe")(functions.config().stripe.skey, {
  apiVersion: "2022-08-01",
});
exports.createStripeCheckout = functions.https.onRequest(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Please Enter a name" });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 500,
      currency: "gbp",
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
