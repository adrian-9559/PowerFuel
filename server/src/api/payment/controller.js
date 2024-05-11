// En stripe/controller.js
const stripe = require('stripe')('sk_test_51P5QR3Iqj90TtX55z91nDeNdwkwNqgDntRABpqklGubEOnrtfEsR2M6YivU8ithiAG0EktidG1W2F50YYIVHG0LL00ste7Tm41');

const createStripeCustomer = async (email, name) => {
    return await stripe.customers.create({ email, name });
};

const getCustomer = async (userId) => {
    return await stripe.customers.retrieve(userId);
};

const getCustomerCharges = async (userId) => {
    return await stripe.charges.list({ customer: userId });
};

const createCheckoutSession = async (customerId, products) => {
    return await stripe.checkout.sessions.create({
        customer: customerId,
        line_items: [...products],
        mode: 'payment',
        ui_mode: 'embedded',
        return_url: `http://${process.env.SERVER_HOST}:3000/cart`
    });
};

module.exports = {
    createStripeCustomer,
    getCustomer,
    getCustomerCharges,
    createCheckoutSession,
}