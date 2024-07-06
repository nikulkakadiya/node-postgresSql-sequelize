const express = require("express");
const { verifyEmail, registerCustomerAndAdmin, login } = require("../controllers/authController");
const { registrationMiddleware, loginMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.get('/verify-email', verifyEmail);
router.post('/register',registrationMiddleware,registerCustomerAndAdmin)
router.post('/login',loginMiddleware,login)
module.exports = router;