import React from 'react';

/**
 * Welcome Screen - First impression for new users
 * Simple, trust-building messaging in local language
 */
const Welcome = ({ onNext }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-green-50 to-white">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">
          आपका स्वागत है! 🙏
        </h1>
        <p className="text-lg text-gray-600">
          Start investing with just ₹10
        </p>
        <p className="text-sm text-gray-500">
          Safe • Simple • Secure
        </p>
        
        <button
          onClick={onNext}
          className="mt-8 px-8 py-3 bg-green-600 text-white rounded-lg font-semibold"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome;
