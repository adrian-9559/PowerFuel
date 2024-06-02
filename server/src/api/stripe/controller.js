// stripe/controller.js

const stripe = require('stripe')('sk_test_51P5QR3Iqj90TtX551kH7daGUlHYw949RcnB6nI5LMDYrbZALCilz6YXBdofMrujKoKPZTBVDquCsvb0zN3gRuDOi00TK4DySoc');
const errorDisplay = "(Error en el controlador de Stripe)";

const createStripeCustomer = async (email, name) => {
    try {
        return await stripe.customers.create({ email, name });
    } catch (error) {
        throw new Error(`Error al intentar crear el cliente Stripe ${errorDisplay}`, error);
    }
};

const getCustomer = async (userId) => {
    try {
        return await stripe.customers.retrieve(userId);
    } catch (error) {
        throw new Error(`Error al intentar obtener el cliente Stripe ${errorDisplay}`, error);
    }
};

const getCustomerCharges = async (userId) => {
    try {
        return await stripe.charges.list({ customer: userId });
    } catch (error) {
        throw new Error(`Error al intentar obtener los cargos del cliente ${errorDisplay}`, error);
    }
};

const createCheckoutSession = async (customerId, line_items) => {
    try {
        return await stripe.checkout.sessions.create({
            customer: customerId,
            line_items,
            mode: 'payment',
            ui_mode: 'embedded',
            return_url: `http://${process.env.SERVER_HOST}:3000/success?success=true`,
        });
    } catch (error) {
        throw new Error(`Error al intentar crear la sesión de pago ${errorDisplay}`, error);
    }
};

const getCustomerPaymentMethods = async (customerId) => {
    try {
        const paymentMethods = await stripe.paymentMethods.list({
            customer: customerId,
            type: 'card',
        });

        return paymentMethods;
    } catch (error) {
        throw new Error(`Error al intentar obtener los métodos de pago del cliente ${errorDisplay}`, error);
    }
};

const createProduct = async (name, description, price) => {
    try {
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
    } catch (error) {
        throw new Error(`Error al intentar crear el producto ${errorDisplay}`, error);
    }
};

const deleteProduct = async (productId) => {
    try {
        const product = await stripe.products.update(productId, { active: false });
    } catch (error) {
        throw new Error(`Error al intentar eliminar el producto: ${error.message}`);
    }
};

const updateProduct = async (productId, product) => {
    try {
        await stripe.products.update(productId, {
            name: product.product_name,
            description: product.description
        });

        await stripe.prices.update(product.stripe_price_id, {
            unit_amount: product.price*100
        });
    } catch (error) {
        throw new Error(`Error al intentar actualizar el producto ${errorDisplay}`, error);
    }
};

module.exports = {
    createStripeCustomer,
    getCustomer,
    getCustomerCharges,
    createCheckoutSession,
    getCustomerPaymentMethods,
    createProduct,
    deleteProduct,
    updateProduct
}