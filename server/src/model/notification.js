const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class Notification extends Model {}
Notification.init({
    notification_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    notification_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    viewed: {
      type: DataTypes.ENUM('1', '0'),
      defaultValue: '0',
      allowNull: false
    },
    reference: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    notification_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
        type: DataTypes.ENUM('Order','Notification'),
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Notification',
    tableName: 'notification',
    timestamps: false
  });

module.exports = Notification;