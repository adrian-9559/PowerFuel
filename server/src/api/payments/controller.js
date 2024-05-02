const stripe = require('stripe')('pk_test_51P5QR3Iqj90TtX55bRu7F6whFW26fRauivAnkLbY1T2DznQWrJIsETlHhYwtKOwj4kIhCZ4joaJQ5DicdSDV1RkS00YqYPtqr4');

createPayment = async (req, res) => {
  try {
    let {status} = await stripe.charges.create({
      amount: 2000, // cantidad a cobrar, en centavos
      currency: "usd",
      description: "Descripción del cargo",
      source: req.body.id
    });

    res.json({status});
  } catch (err) {
    res.status(500).end();
  }
};

createCustomer = async (req, res) => {
    try {
      const customer = await stripe.customers.create({
        email: req.body.email,
      });
  
      res.json({customer_id: customer.id});
    } catch (err) {
      res.status(500).end();
    }
  };
  
  addCard = async (req, res) => {
    try {
      const card = await stripe.customers.createSource(req.body.customer_id, {
        source: req.body.token,
      });
  
      res.json({card});
    } catch (err) {
      res.status(500).end();
    }
  };

module.exports = {
    createPayment,
    createCustomer,
    addCard
    };