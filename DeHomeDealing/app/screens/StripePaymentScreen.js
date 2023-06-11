import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { StripeCardInput } from "@stripe/stripe-react-native";

const PaymentScreen = () => {
  const [amount, setAmount] = useState(0);
  const [cardInfo, setCardInfo] = useState(null);

  const handleCardInfoChange = (info) => {
    setCardInfo(info);
  };

  const handlePayment = async () => {
    if (!cardInfo) {
      return;
    }

    // Create a Stripe payment token
    const token = await stripe.createPaymentMethod({
      type: "card",
      card: cardInfo,
    });

    // Send the payment token to your server to create a charge
    const response = await fetch("https://my-server.com/create-charge", {
      method: "POST",
      body: JSON.stringify({
        stripeToken: token.id,
        amount,
      }),
    });

    // Handle the response from your server
    if (response.ok) {
      // Payment successful
    } else {
      // Payment failed
    }
  };

  return (
    <View>
      <StripeCardInput onChange={handleCardInfoChange} />
      <TextInput
        value={amount}
        onChangeText={(text) => setAmount(text)}
        placeholder="Enter payment amount"
      />
      <Button title="Pay with Stripe" onPress={handlePayment} />
    </View>
  );
};

export default PaymentScreen;
