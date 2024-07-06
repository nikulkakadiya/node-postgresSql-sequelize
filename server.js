const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require("./src/routes/authRoute");
const globleErrorhandler = require('./src/middleware/errorMiddleware');
const { connectDB, sequelize } = require('./src/config/database');
require('dotenv').config();
const app = express();

app.use(bodyParser.json());

// All router define
app.use("/api", authRouter);
app.use("/api", authRouter);

// Heandal all URL.. Not found Request
app.use(globleErrorhandler);
app.all("*", (req, res, next) => {
    const err = new Error(`Not Found ${req.originalUrl} on this server`);
  
    res.status(404).json({
      message: err.message,
    });
  });

app.listen(process.env.PORT, async() => {
    console.log(`Server is running on port ${process.env.PORT}`);
    await connectDB();
    sequelize.sync({ force: false }).then(() => {
        console.log("Database Connected Successfully");
    });
});