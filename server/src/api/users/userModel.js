const { Op } = require('sequelize');
const { UserCredentials, UserInfo, UserRoles, Role } = require('../../model');
const errorDisplay = "(Error en el modelo de Users)";

class model {
    /**
     * Función para añadir un nuevo usuario.
     * Function to add a new user.
     * 
     * @param {Object} user - El objeto del usuario. | The user object.
     * 
     * @returns {Promise} - Promesa que resuelve al añadir el usuario, devolviendo un objeto con el ID del usuario. | Promise that resolves when adding the user, returning an object with the user ID.
     * @throws {Error} - Error al intentar añadir el usuario. | Error when trying to add the user.
     */
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
    
    /**
     * Función para actualizar un usuario existente.
     * Function to update an existing user.
     * 
     * @param {string} userId - El ID del usuario. | The user's ID.
     * @param {Object} user - El objeto del usuario con los datos actualizados. | The user object with the updated data.
     * 
     * @returns {Promise} - Promesa que resuelve al actualizar el usuario, devolviendo el usuario actualizado. | Promise that resolves when updating the user, returning the updated user.
     * @throws {Error} - Error al intentar actualizar el usuario. | Error when trying to update the user.
     */
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

    /**
     * Función para eliminar un usuario existente.
     * Function to delete an existing user.
     * 
     * @param {string} userId - El ID del usuario. | The user's ID.
     * 
     * @returns {Promise} - Promesa que resuelve al eliminar el usuario, devolviendo null si el usuario fue eliminado correctamente. | Promise that resolves when deleting the user, returning null if the user was deleted correctly.
     * @throws {Error} - Error al intentar eliminar el usuario. | Error when trying to delete the user.
     */
    deleteUser = async (userId) => {
        try {
            await UserCredentials.destroy({ where: { user_id: userId } });
            return await UserCredentials.findOne({ where: { user_id: userId } });
        } catch (error) {
            throw new Error(`Error al eliminar el usuario ${errorDisplay}`, error);
        }
    };

    /**
     * Función para obtener un usuario por su correo electrónico.
     * Function to get a user by their email.
     * 
     * @param {string} email - El correo electrónico del usuario. | The user's email.
     * 
     * @returns {Promise} - Promesa que resuelve al obtener el usuario, devolviendo el usuario si se encuentra o null si no se encuentra. | Promise that resolves when getting the user, returning the user if found or null if not found.
     * @throws {Error} - Error al intentar obtener el usuario por correo electrónico. | Error when trying to get the user by email.
     */
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
        
    /**
     * Función para obtener una lista de usuarios.
     * Function to get a list of users.
     * 
     * @param {number} skip - El número de usuarios a omitir en la consulta. | The number of users to skip in the query.
     * @param {number} limit - El número máximo de usuarios a devolver. | The maximum number of users to return.
     * @param {string} userId - El ID del usuario. Si se proporciona, la consulta se limitará a este usuario. | The user's ID. If provided, the query will be limited to this user.
     * 
     * @returns {Promise} - Promesa que resuelve al obtener los usuarios, devolviendo una lista de usuarios. | Promise that resolves when getting the users, returning a list of users.
     * @throws {Error} - Error al intentar obtener los usuarios. | Error when trying to get the users.
     */
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

    /**
     * Función para obtener el conteo total de usuarios.
     * Function to get the total count of users.
     * 
     * @returns {Promise} - Promesa que resuelve al obtener el conteo de usuarios, devolviendo el número total de usuarios. | Promise that resolves when getting the user count, returning the total number of users.
     * @throws {Error} - Error al intentar obtener el conteo de usuarios. | Error when trying to get the user count.
     */
    getUsersCount = async () => {
        try {
            return await UserCredentials.count();
        } catch (error) {
            throw new Error(`Error al obtener el conteo de usuarios ${errorDisplay}`, error);
        }
    };

    /**
     * Función para obtener una lista de usuarios por fecha de registro.
     * Function to get a list of users by registration date.
     * 
     * @param {Date} startDate - La fecha de inicio para la consulta. | The start date for the query.
     * @param {Date} endDate - La fecha de fin para la consulta. | The end date for the query.
     * 
     * @returns {Promise} - Promesa que resuelve al obtener los usuarios, devolviendo una lista de usuarios que se registraron entre las fechas proporcionadas. | Promise that resolves when getting the users, returning a list of users who registered between the provided dates.
     * @throws {Error} - Error al intentar obtener los usuarios por fecha de registro. | Error when trying to get the users by registration date.
     */
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