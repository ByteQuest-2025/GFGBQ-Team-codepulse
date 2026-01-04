import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  // req.user is set by the protect middleware
  const user = await User.findById(req.user._id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// @desc    Update user balance (e.g., after deposit/withdrawal)
// @route   PUT /api/user/:id/balance
// @access  Private (Admin or controlled by system for transactions)
router.put('/:id/balance', protect, authorize('admin'), async (req, res) => {
    // For simplicity, we assume this is called by a service or admin.
    // In a real app, strict validation and transaction management is needed.
    const { amount, type } = req.body; // type: 'add' or 'subtract'

    const user = await User.findById(req.params.id);

    if (user) {
        if (type === 'add') {
            user.balance += amount;
        } else if (type === 'subtract') {
            if (user.balance < amount) {
                return res.status(400).json({ message: 'Insufficient funds' });
            }
            user.balance -= amount;
        } else {
            return res.status(400).json({ message: 'Invalid balance update type' });
        }
        const updatedUser = await user.save();
        res.json({ balance: updatedUser.balance });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// @desc    Update user education progress
// @route   PUT /api/user/progress
// @access  Private
router.put('/progress', protect, async (req, res) => {
  const { lessonId, completed } = req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    const existingProgressIndex = user.educationProgress.findIndex(
      (p) => p.lessonId.toString() === lessonId
    );

    if (existingProgressIndex > -1) {
      user.educationProgress[existingProgressIndex].completed = completed;
      user.educationProgress[existingProgressIndex].lastAccessed = Date.now();
    } else {
      user.educationProgress.push({ lessonId, completed });
    }

    const updatedUser = await user.save();
    res.json(updatedUser.educationProgress);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

export default router;