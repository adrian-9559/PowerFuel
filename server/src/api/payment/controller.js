// stripe/controller.js

const stripe = require('stripe')('sk_test_51P5QR3Iqj90TtX55z91nDeNdwkwNqgDntRABpqklGubEOnrtfEsR2M6YivU8ithiAG0EktidG1W2F50YYIVHG0LL00ste7Tm41');
const { getProductById } = require('../products/controller');
const { getUserById } = require('../users/controller');
const { createOrder } = require('../orders/controller');
const { createCheckoutSession, getCustomerCharges } = require('../stripe/controller');


const createCheckout = async (cart, userId) => {
    const user = await getUserById(userId);

    const line_items = await Promise.all(cart.map(async item => {
        const product = await getProductById(item.product_id);
        return {
            price: product.stripe_price_id,
            quantity: parseInt(item.quantity)
        };
    }));

    const session = await createCheckoutSession(user.stripe_customer_id, line_items);

    return session;
};

const getCustomerPaymentMethods = async (userId) => {
    const user = await getUserById(userId);

    const paymentMethods = await stripe.paymentMethods.list({
        customer: user.stripe_customer_id,
        type: 'card',
      });

    return paymentMethods;
};

const getUserPayments = async (userId) => {
    const user = await getUserById(userId);

    return await getCustomerCharges(user.stripe_customer_id);
};

const getLastPayment = async (userId) => {
    const user = await getUserById(userId);
    const charges = await getCustomerCharges(user.stripe_customer_id);

    const lastCharge = charges.data.pop();

    return lastCharge;
}

module.exports = {
    createCheckout,
    getCustomerPaymentMethods,
    getUserPayments,
    getLastPayment
}