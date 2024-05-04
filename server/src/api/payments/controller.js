const stripe = require('stripe')('sk_test_51P5QR3Iqj90TtX55z91nDeNdwkwNqgDntRABpqklGubEOnrtfEsR2M6YivU8ithiAG0EktidG1W2F50YYIVHG0LL00ste7Tm41');

const confirmPayment = async (req, res) => {
  console.log(req);
  console.log(req.body);
  const { amount } = req.body;

  console.log(amount);
  console.log(req.body);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Convertir a céntimos
      currency: "eur",
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      error: err.message,
    });
  }
}

module.exports = {
  confirmPayment
};