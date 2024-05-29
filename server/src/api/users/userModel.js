const { Op } = require('sequelize');
const { UserCredentials, UserInfo, UserRoles, Role } = require('../../model');


class model {
    addUser = async (user) => {
        const newUserCredentials = await UserCredentials.create({ 
            email: user.email, 
            current_password: user.current_password,
            stripe_customer_id: user.stripeCustomer.id,
            time_register: user.time_register
        });
        
        await UserInfo.create({
            user_id: newUserCredentials.user_id,
            first_name: user.first_name,
            last_name: user.last_name,
            dni: user.dni
        });
    
        if (user.role_id) {
            await UserRoles.create({
                user_id: newUserCredentials.user_id,
                role_id: user.role_id
            });
        } else {
            await UserRoles.create({
                user_id: newUserCredentials.user_id,
            });
        }
    
        return { user_id: newUserCredentials.user_id };
    };
    
    updateUser = async (userId, user) => {
        const { email, current_password, first_name, last_name, dni, role_id } = user;

        await UserCredentials.update({ email, current_password }, { where: { user_id: userId } });
        await UserInfo.update({ first_name, last_name, dni }, { where: { user_id: userId } });

        if (role_id) {
            await UserRoles.update({ role_id }, { where: { user_id: userId } });
        }

        return await this.getUserByEmail(user.email);
    };
    
    deleteUser = async (userId) => {
        await UserCredentials.destroy({ where: { user_id: userId } });
        return await UserCredentials.findOne({ where: { user_id: userId } });
    };
    
    getUserByEmail = async (email) => {
        return await UserCredentials.findOne(
            {
                where:
                    { email: email },
                include: [{ model: UserInfo, required: true }]
            });
    };
    
    getUsers = async (skip = 0, limit = 10, userId=null) => {
        return await UserCredentials.findAll({
            where: userId ? { user_id: userId } : {},
            offset: skip,
            limit: limit,
            include: [
                { model: UserInfo, required: true, attributes: ['first_name', 'last_name', 'dni'] },
                { 
                    model: Role, 
                    required: true, 
                    attributes: ['role_id', 'role_name'],
                    through: { model: UserRoles, attributes: [] } // Include the UserRoles model in the through option
                }
            ]
        });
    };
    
    getUsersCount = () => UserCredentials.count();

    getUsersByRegistrationDate = async (startDate, endDate) => {
        return await UserCredentials.findAll({
            where: {
                registration_date: {
                    [Op.between]: [startDate, endDate]
                }
            },
            include: [
                { model: UserInfo, required: true, attributes: ['first_name', 'last_name', 'dni'] },
                { 
                    model: Role, 
                    required: true, 
                    attributes: ['role_id', 'role_name'],
                    through: { model: UserRoles, attributes: [] } 
                }
            ]
        });
    };
}

module.exports = new model();