import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { phoneNumber, password, name } = req.body;

    if (!phoneNumber || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    const userExists = await User.findOne({ phoneNumber });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      phoneNumber,
      password,
      name,
    });

    if (user) {
      return res.status(201).json({
        _id: user._id,
        phoneNumber: user.phoneNumber,
        name: user.name,
        token: generateToken(user._id),
      });
    }

    return res.status(400).json({ message: 'Invalid user data' });
  } catch (error) {
    console.error('Error in /register:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      return res.status(400).json({ message: 'Please enter phone number and password' });
    }

    const user = await User.findOne({ phoneNumber });

    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        phoneNumber: user.phoneNumber,
        name: user.name,
        token: generateToken(user._id),
      });
    }

    return res.status(401).json({ message: 'Invalid phone number or password' });
  } catch (error) {
    console.error('Error in /login:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

export default router;
