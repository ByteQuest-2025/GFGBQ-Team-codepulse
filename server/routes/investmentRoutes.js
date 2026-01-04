import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Investment from '../models/Investment.js';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js'; // To record related transactions

const router = express.Router();

// @desc    Get all investments for a user
// @route   GET /api/investments
// @access  Private
router.get('/', protect, async (req, res) => {
  const investments = await Investment.find({ userId: req.user._id });
  res.json(investments);
});

// @desc    Get a single investment by ID
// @route   GET /api/investments/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  const investment = await Investment.findOne({ _id: req.params.id, userId: req.user._id });
  if (investment) {
    res.json(investment);
  } else {
    res.status(404).json({ message: 'Investment not found' });
  }
});

// @desc    Create a new investment
// @route   POST /api/investments
// @access  Private
router.post('/', protect, async (req, res) => {
  const { amount, investmentType } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Investment amount must be positive' });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  if (user.balance < amount) {
    return res.status(400).json({ message: 'Insufficient balance to make this investment' });
  }

  // Deduct amount from user balance and create transaction
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    user.balance -= amount;
    await user.save({ session });

    const investment = new Investment({
      userId: req.user._id,
      amount,
      investmentType,
      status: 'completed', // Assuming immediate completion for simplicity
    });
    await investment.save({ session });

    const transaction = new Transaction({
      userId: req.user._id,
      type: 'investment',
      amount: -amount, // Negative for outflow
      description: `Investment in ${investmentType || 'general fund'}`,
      referenceId: investment._id,
      status: 'completed',
    });
    await transaction.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(investment);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    res.status(500).json({ message: 'Server error during investment creation' });
  }
});


// @desc    Update an investment (e.g., status, return) - requires careful logic
// @route   PUT /api/investments/:id
// @access  Private (and possibly admin only for certain fields)
router.put('/:id', protect, async (req, res) => {
  const { status, returnRate } = req.body; // Example fields to update

  const investment = await Investment.findOne({ _id: req.params.id, userId: req.user._id });

  if (investment) {
    if (status) investment.status = status;
    if (returnRate !== undefined) investment.returnRate = returnRate;

    const updatedInvestment = await investment.save();
    res.json(updatedInvestment);
  } else {
    res.status(404).json({ message: 'Investment not found' });
  }
});

// @desc    Delete an investment (rarely allowed for actual investments)
// @route   DELETE /api/investments/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  const investment = await Investment.findOne({ _id: req.params.id, userId: req.user._id });

  if (investment) {
    await investment.deleteOne(); // Use deleteOne() instead of remove()
    res.json({ message: 'Investment removed' });
  } else {
    res.status(404).json({ message: 'Investment not found' });
  }
});

export default router;