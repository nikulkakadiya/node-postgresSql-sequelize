const db = require("../config/database");
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendVerificationEmail = require("../utils/sendEmail");

const User = db.user

exports.registerCustomerAndAdmin = async(req, res, next)=>{
    const { email, password } = req.body;
    try{
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          ...req.body,
          password:hashedPassword,
        });
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
        sendVerificationEmail(email, token);
        res.status(201).json({ message: 'User registered, please verify your email.' });
    }catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: 'User not found.' });
        if (user.role !== 'admin') return res.status(403).json({ message: 'You are not allowed to login from here' });
        if (!user.isVerified) return res.status(400).json({ message: 'Please verify your email first.' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password.' });
        
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
        res.status(200).json({
          message: 'Admin login successfully...',
           token 
          });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
    const { token } = req.query;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id);
      if (user) {
        user.isVerified = true;
        await user.save();
        res.status(200).json({ message: 'Email verified successfully.' });
      } else {
        res.status(400).json({ message: 'Invalid token.' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Invalid token.' });
    }
  };