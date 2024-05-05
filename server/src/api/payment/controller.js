const stripe = require('stripe')('sk_test_51P5QR3Iqj90TtX55z91nDeNdwkwNqgDntRABpqklGubEOnrtfEsR2M6YivU8ithiAG0EktidG1W2F50YYIVHG0LL00ste7Tm41');
const {getProductById} = require("../products/controller");

const createCheckoutSession = async (req, res) => {
    const {cart} = req.body;

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

    const session = await stripe.checkout.sessions.create({
        line_items: [...products],
        mode: 'payment',
        ui_mode: 'embedded',
        return_url: 'http://25.65.210.24:3000/cart'
    });

    res.send({clientSecret: session.client_secret});
};

module.exports = {
    createCheckoutSession,
}