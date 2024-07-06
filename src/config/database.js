const { Sequelize,DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER,process.env.DB_PASSWORD , {
    host: process.env.DB_HOST,
    dialect: 'postgres',
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("Connection Successful");
    } catch (error) {
        console.error("Unable to connect to database: ", error);
    }
}

module.exports = { connectDB, sequelize, Sequelize, DataTypes };