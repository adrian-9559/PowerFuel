// stripe/controller.js

const stripe = require('stripe')('sk_test_51P5QR3Iqj90TtX551kH7daGUlHYw949RcnB6nI5LMDYrbZALCilz6YXBdofMrujKoKPZTBVDquCsvb0zN3gRuDOi00TK4DySoc');


const createStripeCustomer = async (email, name) => {
    return await stripe.customers.create({ email, name });
};

const getCustomer = async (userId) => {
    return await stripe.customers.retrieve(userId);
};

const getCustomerCharges = async (userId) => {
    return await stripe.charges.list({ customer: userId });
};

const createCheckoutSession = async (customerId, line_items) => {
    return await stripe.checkout.sessions.create({
        customer: customerId,
        line_items,
        mode: 'payment',
        ui_mode: 'embedded',
        return_url: `http://${process.env.SERVER_HOST}:3000/success?success=true`,
    });
};

const getCustomerPaymentMethods = async (customerId) => {
    const paymentMethods = await stripe.paymentMethods.list({
        customer: customerId,
        type: 'card',
      });

    return paymentMethods;
};

const createProduct = async (name, description, price) => {
    const product = await stripe.products.create({
        name,
        description
    });

    const priceObject = await stripe.prices.create({
        unit_amount: price*100,
        currency: 'eur',
        product: product.id
    });

    return { productId: product.id, priceId: priceObject.id };
};

module.exports = {
    createStripeCustomer,
    getCustomer,
    getCustomerCharges,
    createCheckoutSession,
    getCustomerPaymentMethods,
    createProduct
}