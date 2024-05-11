// En un nuevo archivo, por ejemplo, checkout/controller.js
const {getProductById} = require("../products/controller");
const { getUsers } = require("../users/controller");
const { createCheckoutSession } = require("./controller");

const createCheckout = async (cart, userId) => {
    const user = await getUsers(null, null, userId);

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

    return await createCheckoutSession(user.stripe_costumer_id, products);
};

module.exports = {
    createCheckout,
}