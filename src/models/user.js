module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        role: {
            type: Sequelize.ENUM('customer', 'admin'),
            defaultValue: 'customer',
            allowNull: false,
        },
        isVerified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    });

    return User;
};
