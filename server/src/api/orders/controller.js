const { getCustomerCharges, getOrderLineItems } = require('../stripe/controller');
const { getUserById } = require('../users/controller');

const getUserOrders = async (userId) => {
    const user = await getUserById(userId);
    return await getCustomerCharges(user.stripe_customer_id);
};

module.exports = {
    getUserOrders
};