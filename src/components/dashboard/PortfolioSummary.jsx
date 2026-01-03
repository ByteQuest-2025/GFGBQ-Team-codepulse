import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Portfolio Summary Component
 * Simple overview of user's investments
 */
const PortfolioSummary = ({ portfolio }) => {
  const navigate = useNavigate();
  const totalInvested = portfolio.reduce((sum, inv) => sum + inv.amount, 0);
  const totalCurrent = portfolio.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalGain = totalCurrent - totalInvested;
  const gainPercentage = ((totalGain / totalInvested) * 100).toFixed(2);

  return (
    <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-lg p-6 text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Your Portfolio</h2>
        <span className="text-sm opacity-90">Updated Now</span>
      </div>

      <div className="mb-4">
        <div className="text-sm opacity-90 mb-1">Total Value</div>
        <div className="text-3xl font-bold">₹{totalCurrent.toFixed(2)}</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white bg-opacity-20 rounded-lg p-3">
          <div className="text-xs opacity-90 mb-1">Invested</div>
          <div className="text-lg font-semibold">₹{totalInvested}</div>
        </div>
        
        <div className="bg-white bg-opacity-20 rounded-lg p-3">
          <div className="text-xs opacity-90 mb-1">Returns</div>
          <div className="text-lg font-semibold">
            ₹{totalGain.toFixed(2)} ({gainPercentage > 0 ? '+' : ''}{gainPercentage}%)
          </div>
        </div>
      </div>

      <div className="mt-4 flex space-x-2">
        <button 
          onClick={() => navigate('/invest')}
          className="flex-1 bg-white text-green-600 py-2 rounded-lg font-semibold text-sm hover:bg-green-50 transition-all"
        >
          + Add Money
        </button>
        <button 
          onClick={() => navigate('/passbook')}
          className="flex-1 bg-white bg-opacity-20 py-2 rounded-lg font-semibold text-sm hover:bg-white hover:bg-opacity-30 transition-all"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PortfolioSummary;
