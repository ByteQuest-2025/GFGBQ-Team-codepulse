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
  const { phoneNumber, password, name } = req.body;

  if (!phoneNumber || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  // Check if user already exists
  const userExists = await User.findOne({ phoneNumber });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create new user
  const user = await User.create({
    phoneNumber,
    password,
    name,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      phoneNumber: user.phoneNumber,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  const { phoneNumber, password } = req.body;

  // Check for user phoneNumber
  const user = await User.findOne({ phoneNumber });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      phoneNumber: user.phoneNumber,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid phone number or password' });
  }
});

export default router;
