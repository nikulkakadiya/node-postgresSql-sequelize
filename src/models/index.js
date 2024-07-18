const { sequelize } = require('../config/database.js');
const User = require('./user.js');
const Address = require('./address.js');

// Set up associations
User.hasMany(Address, {
    foreignKey: 'userId'
});
Address.belongsTo(User, {
    foreignKey: 'userId'
});

// Export the models
module.exports = {
    sequelize,
    User,
    Address,
};