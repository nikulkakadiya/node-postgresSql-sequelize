const { User, Address } = require("../models/index");

exports.getAllUser = async (req, res, next) => {
    try {
        const user = await User.findAll({
            include:[{
                model:Address
            }]
        });
        res.status(200).json({ 
            message: 'success',
            data:user
        });
    } catch (error) {
        console.log(error);
        next(error); // It's a good practice to pass the error to the next middleware
    }
};