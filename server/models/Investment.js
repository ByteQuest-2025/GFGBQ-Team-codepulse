import mongoose from 'mongoose';

const investmentSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'pending',
    },
    // Potentially add 'plan' or 'fund' type if different investment options exist
    investmentType: {
      type: String,
      enum: ['mutual_fund', 'fixed_deposit', 'equity'], // Example types
      default: 'mutual_fund'
    },
    returnRate: { // Placeholder for calculating returns
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

const Investment = mongoose.model('Investment', investmentSchema);

export default Investment;