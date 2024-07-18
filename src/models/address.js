const { sequelize, DataTypes } = require('../config/database.js');
const User = require('./user.js');
const Address = sequelize.define('Address', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field:'user_id',
    },
    street: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Address;
