import React, { useState } from 'react';

/**
 * Amount Selection Component
 * Allows users to invest small amounts easily
 */
const AmountSelector = ({ minAmount = 10, maxAmount = 10000, onAmountSelect }) => {
  const [amount, setAmount] = useState(0);
  const [customInput, setCustomInput] = useState('');

  const quickAmounts = [10, 50, 100, 500, 1000, 2000];

  const handleQuickSelect = (value) => {
    setAmount(value);
    setCustomInput('');
    onAmountSelect(value);
  };

  const handleCustomInput = (value) => {
    const numValue = parseInt(value) || 0;
    setCustomInput(value);
    setAmount(numValue);
    // Always notify parent of the amount change, even if invalid
    onAmountSelect(numValue);
  };

  const handleInputFocus = () => {
    // When input is focused, deselect quick amount buttons
    if (!customInput) {
      setCustomInput(amount > 0 ? amount.toString() : '');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      <h3 className="text-xl font-semibold mb-4">How much do you want to invest?</h3>
      
      <div className="text-center mb-6">
        <div className={`text-4xl font-bold mb-2 ${amount > 0 ? 'text-green-600' : 'text-gray-400'}`}>
          ₹{amount > 0 ? amount : '0'}
        </div>
        <p className="text-sm text-gray-500">
          Minimum: ₹{minAmount} • Maximum: ₹{maxAmount}
        </p>
        {amount === 0 && (
          <p className="text-xs text-orange-600 mt-1">
            Please select or enter an amount to continue
          </p>
        )}
      </div>

      <div className="mb-6">
        <label className="text-sm text-gray-600 mb-2 block">Quick Select</label>
        <div className="grid grid-cols-3 gap-2">
          {quickAmounts.filter(val => val >= minAmount).map((value) => (
            <button
              key={value}
              onClick={() => handleQuickSelect(value)}
              className={`py-3 rounded-lg border-2 font-semibold transition-all ${
                amount === value && !customInput
                  ? 'border-green-600 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              ₹{value}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-600 mb-2 block">Or Enter Custom Amount</label>
        <input
          type="number"
          value={customInput}
          onChange={(e) => handleCustomInput(e.target.value)}
          onFocus={handleInputFocus}
          placeholder={`Enter amount (₹${minAmount} - ₹${maxAmount})`}
          className={`w-full p-3 border-2 rounded-lg focus:outline-none transition-all ${
            customInput && (amount < minAmount || amount > maxAmount)
              ? 'border-red-500 focus:border-red-600 bg-red-50'
              : 'border-gray-200 focus:border-green-600'
          }`}
          min={minAmount}
          max={maxAmount}
        />
        {customInput && amount < minAmount && (
          <p className="text-xs text-red-600 mt-1">
            Minimum amount is ₹{minAmount}
          </p>
        )}
        {customInput && amount > maxAmount && (
          <p className="text-xs text-red-600 mt-1">
            Maximum amount is ₹{maxAmount}
          </p>
        )}
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-700">
          💡 <strong>Tip:</strong> Start small! You can always invest more later.
        </p>
      </div>
    </div>
  );
};

export default AmountSelector;
