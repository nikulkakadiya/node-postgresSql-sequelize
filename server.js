const express = require('express');
const bodyParser = require('body-parser');
const db = require('./src/config/database');
const authRouter = require("./src/routes/authRoute");
const globleErrorhandler = require('./src/middleware/errorMiddleware');
require('dotenv').config();
const app = express();

app.use(bodyParser.json());
db.sequelize.sync()

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

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});