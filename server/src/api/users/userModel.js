const { Op } = require('sequelize');
const { UserCredentials, UserInfo, UserRoles, Role } = require('../../model');
const errorDisplay = "(Error en el modelo de Users)";

class model {
    addUser = async (user) => {
        try {
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
        } catch (error) {
            throw new Error(`Error al añadir el usuario ${errorDisplay}`, error);
        }
    };
        
    updateUser = async (userId, user) => {
        try {
            const { email, current_password, first_name, last_name, dni, role_id } = user;

            await UserCredentials.update({ email, current_password }, { where: { user_id: userId } });
            await UserInfo.update({ first_name, last_name, dni }, { where: { user_id: userId } });

            if (role_id) {
                await UserRoles.update({ role_id }, { where: { user_id: userId } });
            }

            return await this.getUserByEmail(user.email);
        } catch (error) {
            throw new Error(`Error al actualizar el usuario ${errorDisplay}`, error);
        }
    };    

    deleteUser = async (userId) => {
        try {
            await UserCredentials.destroy({ where: { user_id: userId } });
            return await UserCredentials.findOne({ where: { user_id: userId } });
        } catch (error) {
            throw new Error(`Error al eliminar el usuario ${errorDisplay}`, error);
        }
    };
        
    getUserByEmail = async (email) => {
        try {
            return await UserCredentials.findOne(
                {
                    where:
                        { email: email },
                    include: [{ model: UserInfo, required: true }]
                });
        } catch (error) {
            throw new Error(`Error al obtener el usuario por correo electrónico ${errorDisplay}`, error);
        }
    };
        
    getUsers = async (skip = 0, limit = 10, userId=null) => {
        try {
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
        } catch (error) {
            throw new Error(`Error al obtener los usuarios ${errorDisplay}`, error);
        }
    };
        
    getUsersCount = async () => {
        try {
            return await UserCredentials.count();
        } catch (error) {
            throw new Error(`Error al obtener el conteo de usuarios ${errorDisplay}`, error);
        }
    };

    getUsersByRegistrationDate = async (startDate, endDate) => {
        try {
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
        } catch (error) {
            throw new Error(`Error al obtener los usuarios por fecha de registro ${errorDisplay}`, error);
        }
    };
}

module.exports = new model();