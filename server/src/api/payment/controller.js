// stripe/controller.js

const stripe = require('stripe')('sk_test_51P5QR3Iqj90TtX55z91nDeNdwkwNqgDntRABpqklGubEOnrtfEsR2M6YivU8ithiAG0EktidG1W2F50YYIVHG0LL00ste7Tm41');
const { getProductById } = require('../products/controller');
const { getUserById } = require('../users/controller');
const { createOrder } = require('../orders/controller');
const { createCheckoutSession, getCustomerCharges } = require('../stripe/controller');
const errorDisplay = "(Error en el controlador de Payment)";

const createCheckout = async (cart, userId) => {
    try {
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
    } catch (error) {
        throw new Error(`Error al intentar crear el checkout ${errorDisplay}`, error);
    }
};

const getCustomerPaymentMethods = async (userId) => {
    try {
        const user = await getUserById(userId);

        const paymentMethods = await stripe.paymentMethods.list({
            customer: user.stripe_customer_id,
            type: 'card',
        });

        return paymentMethods;
    } catch (error) {
        throw new Error(`Error al intentar obtener los métodos de pago del cliente ${errorDisplay}`, error);
    }
};

const getUserPayments = async (userId) => {
    try {
        const user = await getUserById(userId);

        return await getCustomerCharges(user.stripe_customer_id);
    } catch (error) {
        throw new Error(`Error al intentar obtener los pagos del usuario ${errorDisplay}`, error);
    }
};

const getLastPayment = async (userId) => {
    try {
        const user = await getUserById(userId);
        const charges = await getCustomerCharges(user.stripe_customer_id);

        const lastCharge = charges.data[0];

        return lastCharge;
    } catch (error) {
        throw new Error(`Error al intentar obtener el último pago ${errorDisplay}`, error);
    }
};

module.exports = {
    createCheckout,
    getCustomerPaymentMethods,
    getUserPayments,
    getLastPayment
}