module.exports.paymentRequest = async (req, res, stripe) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 3,
      currency: "gbp",
      payment_method_types: ["card"],
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: err.message,
    });
  }
};
