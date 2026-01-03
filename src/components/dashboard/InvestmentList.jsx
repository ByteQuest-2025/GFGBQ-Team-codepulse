import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Investment List Component
 * Shows all active investments in simple format
 */
const InvestmentList = ({ investments }) => {
  const navigate = useNavigate();
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Your Investments</h3>
      
      {investments.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <span className="text-6xl">💰</span>
          <p className="text-gray-600 mt-4">No investments yet</p>
          <button 
            onClick={() => navigate('/invest')}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all"
          >
            Start Investing
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {investments.map((investment) => {
            const gain = investment.currentValue - investment.amount;
            const gainPercent = ((gain / investment.amount) * 100).toFixed(2);
            
            return (
              <div
                key={investment.id}
                className="bg-white border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{investment.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Started: {new Date(investment.startDate).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    Active
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div>
                    <div className="text-xs text-gray-500">Invested</div>
                    <div className="font-semibold">₹{investment.amount}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Current</div>
                    <div className="font-semibold text-green-600">
                      ₹{investment.currentValue.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Returns</div>
                    <div className={`font-semibold ${gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {gain >= 0 ? '+' : ''}{gainPercent}%
                    </div>
                  </div>
                </div>

                <button className="w-full mt-3 text-sm text-green-600 font-semibold py-2 border border-green-600 rounded-lg hover:bg-green-50 transition-all">
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InvestmentList;
