const { Op } = require('sequelize');
const { UserCredentials, UserInfo, UserRoles, Role } = require('../../model/model');


class model {
    addUser = async (user) => {
        const newUserCredentials = await UserCredentials.create({ 
            email: user.email, 
            current_password: user.current_password,
            stripe_customer_id: user.stripeCustomerId,
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
    
        return newUserCredentials.user_id;
    };
    
    updateUser = async (userId, user) => {
        console.log(user);
        console.log(userId);
        try{
        
            await UserCredentials.update({
                email: user.email,
                current_password: user.current_password
            },
                {
                    where: { user_id: userId }
                }
            );
            await UserInfo.update({
                first_name: user.first_name,
                last_name: user.last_name,
                dni: user.dni
            },
                {
                    where: { user_id: userId }
                }
            );
            await UserRoles.update({
                role_id: user.role_id
            },
                {
                    where: { user_id: userId }
                }
            );
            
        }catch(error){
            console.error('Error updating user:', error.message);
            return null;
        }
    
    
        return await this.getUserByEmail(user.email);
    };
    
    deleteUser = async (userId) => {

        const user = await UserCredentials.findOne(
            {
                where: { user_id: userId }
            });

        await UserRoles.destroy(
            {
                where: { user_id: userId }
            });
        await UserInfo.destroy(
            {
                where: { user_id: userId }
            });
        await UserCredentials.destroy(
            {
                where: { user_id: userId }
            });

       return user;
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
        const users = await UserCredentials.findAll({
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
    
        return users;
    };
    
    getUsersCount = () => UserCredentials.count();
    
    getTableColumns = async () => {
        const columns = await UserCredentials.describe();
        return Object.keys(columns);
    };

    getUsersByRegistrationDate = async (startDate, endDate) => {
        const users = await UserCredentials.findAll({
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

        return users;
    };
}

module.exports = new model();