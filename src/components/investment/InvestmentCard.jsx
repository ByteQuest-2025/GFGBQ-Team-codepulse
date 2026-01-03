import React from 'react';

/**
 * Investment Option Card
 * Shows safe, low-risk investment options clearly
 */
const InvestmentCard = ({ investment, onSelect }) => {
  const riskColors = {
    low: 'text-green-600 bg-green-50',
    'very-low': 'text-green-700 bg-green-100'
  };

  return (
    <div 
      onClick={() => onSelect(investment)}
      className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-green-400 cursor-pointer transition-all"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg">{investment.name}</h3>
        <span className={`px-2 py-1 rounded text-xs font-semibold ${riskColors[investment.risk]}`}>
          {investment.risk === 'very-low' ? 'Very Safe' : 'Safe'}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-4">{investment.description}</p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-50 p-2 rounded">
          <div className="text-xs text-gray-500">Returns</div>
          <div className="font-semibold text-green-600">{investment.returns}%/year</div>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <div className="text-xs text-gray-500">Min. Amount</div>
          <div className="font-semibold">₹{investment.minAmount}</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          Lock-in: {investment.lockIn}
        </span>
        <button className="text-green-600 font-semibold text-sm">
          Learn More →
        </button>
      </div>
    </div>
  );
};

export default InvestmentCard;
