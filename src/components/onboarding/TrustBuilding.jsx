import React from 'react';

/**
 * Trust Building Screen
 * Addresses common fears and builds confidence
 */
const trustPoints = [
  {
    icon: '🔒',
    title: 'Your Money is Safe',
    description: 'Government-regulated investments. Your money is secure.'
  },
  {
    icon: '₹',
    title: 'Start with Just ₹10',
    description: 'No need for large amounts. Start small, grow gradually.'
  },
  {
    icon: '📚',
    title: 'We Teach You',
    description: 'Simple lessons before each step. No confusing terms.'
  },
  {
    icon: '📱',
    title: 'Works on Any Phone',
    description: 'Designed for basic smartphones and slow internet.'
  }
];

const TrustBuilding = ({ onNext }) => {
  return (
    <div className="min-h-screen p-6 bg-white">
      <h2 className="text-2xl font-bold text-center mb-8">
        Why Trust Us?
      </h2>
      
      <div className="space-y-6">
        {trustPoints.map((point, index) => (
          <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
            <span className="text-4xl">{point.icon}</span>
            <div>
              <h3 className="font-semibold text-lg">{point.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{point.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        className="w-full mt-8 py-3 bg-green-600 text-white rounded-lg font-semibold"
      >
        I Understand, Continue
      </button>
    </div>
  );
};

export default TrustBuilding;
