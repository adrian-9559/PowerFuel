// checkoutController.js
const {getProductById} = require("../products/controller");
const { getUserById } = require("../users/controller");
const { createCheckoutSession ,getCustomerPaymentMethods } = require("./controller");

const createCheckout = async (cart, userId) => {
    const user = await getUserById(userId);

    const products = await Promise.all(cart.map(async item => {
        const product = await getProductById(item.product_id);
        return {
            price_data: {
                currency: 'eur',
                product_data: {
                    name: product.product_name
                },
                unit_amount: product.price*100
            }, 
            quantity: item.quantity
        };
    }));

    return await createCheckoutSession(user.stripe_customer_id, products);
};

const getPaymentMethods = async (userId) => {
    const user = await getUserById(userId);
    return await getCustomerPaymentMethods(user[0].stripe_customer_id);
}

module.exports = {
    createCheckout,
    getPaymentMethods
}