import React from 'react';

/**
 * Investment Confirmation Screen
 * Clear summary before final confirmation
 */
const InvestmentConfirmation = ({ investment, amount, onConfirm, onCancel }) => {
  const estimatedReturns = (amount * investment.returns) / 100;

  return (
    <div className="p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Confirm Your Investment</h2>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Investment Plan</span>
            <span className="font-semibold">{investment.name}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Amount Investing</span>
            <span className="font-semibold text-green-600">₹{amount}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Expected Return (1 year)</span>
            <span className="font-semibold text-green-600">₹{estimatedReturns.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Total After 1 Year</span>
            <span className="font-bold text-lg text-green-700">
              ₹{(amount + estimatedReturns).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-yellow-800">
          ⚠️ <strong>Important:</strong> {investment.lockIn} lock-in period. 
          You cannot withdraw during this time.
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={onConfirm}
          className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all"
        >
          Confirm Investment
        </button>
        
        <button
          onClick={onCancel}
          className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-all"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default InvestmentConfirmation;
