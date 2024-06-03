const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class PasswordResetCode extends Model { }
PasswordResetCode.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'PasswordResetCode',
    tableName: 'password_reset_codes',
    timestamps: false
});

module.exports = PasswordResetCode;
