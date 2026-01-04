import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Transaction from '../models/Transaction.js';
import User from '../models/User.js';
import mongoose from 'mongoose'; // For session transactions

const router = express.Router();

// @desc    Get all transactions for a user
// @route   GET /api/transactions
// @access  Private
router.get('/', protect, async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user._id }).sort({ date: -1 });
  res.json(transactions);
});

// @desc    Get a single transaction by ID
// @route   GET /api/transactions/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  const transaction = await Transaction.findOne({ _id: req.params.id, userId: req.user._id });
  if (transaction) {
    res.json(transaction);
  } else {
    res.status(404).json({ message: 'Transaction not found' });
  }
});

// @desc    Create a new transaction (e.g., deposit or withdrawal)
// @route   POST /api/transactions
// @access  Private
router.post('/', protect, async (req, res) => {
  const { type, amount, description, referenceId } = req.body;

  if (!type || !amount || amount <= 0) {
    return res.status(400).json({ message: 'Type and positive amount are required' });
  }
  if (!['deposit', 'withdrawal'].includes(type)) {
    return res.status(400).json({ message: 'Invalid transaction type for this endpoint' });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (type === 'deposit') {
      user.balance += amount;
    } else if (type === 'withdrawal') {
      if (user.balance < amount) {
        throw new Error('Insufficient funds for withdrawal');
      }
      user.balance -= amount;
    }
    await user.save({ session });

    const transaction = new Transaction({
      userId: req.user._id,
      type,
      amount: type === 'withdrawal' ? -amount : amount, // Store withdrawal as negative
      description,
      referenceId,
      status: 'completed',
    });
    await transaction.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(transaction);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    res.status(400).json({ message: error.message || 'Server error during transaction' });
  }
});

export default router;