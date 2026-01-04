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
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-emerald-950">Your investments</h3>
        <span className="text-xs text-emerald-900/70">Active & tracked</span>
      </div>
      
      {investments.length === 0 ? (
        <div className="text-center py-12 rounded-2xl border border-dashed border-emerald-200 bg-white/70">
          <span className="text-5xl">💰</span>
          <p className="text-emerald-900/80 mt-4 font-semibold">No investments yet</p>
          <p className="text-sm text-emerald-900/70">Start with a safe, guided option.</p>
          <button 
            onClick={() => navigate('/invest')}
            className="mt-4 px-6 py-3 rounded-full bg-emerald-900 text-white font-semibold shadow-lg shadow-emerald-900/15 hover:bg-emerald-800 transition-colors"
          >
            Start investing
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
                className="rounded-2xl border border-emerald-100 bg-white/80 backdrop-blur-sm p-4 shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-emerald-950">{investment.name}</h4>
                    <p className="text-xs text-emerald-900/70 mt-1">
                      Started: {new Date(investment.startDate).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-3">
                  <div className="rounded-lg bg-emerald-50/60 p-3">
                    <div className="text-xs text-emerald-900/70">Invested</div>
                    <div className="font-semibold text-emerald-950">₹{investment.amount}</div>
                  </div>
                  <div className="rounded-lg bg-emerald-50/60 p-3">
                    <div className="text-xs text-emerald-900/70">Current</div>
                    <div className="font-semibold text-emerald-800">
                      ₹{investment.currentValue.toFixed(2)}
                    </div>
                  </div>
                  <div className="rounded-lg bg-emerald-50/60 p-3">
                    <div className="text-xs text-emerald-900/70">Returns</div>
                    <div className={`font-semibold ${gain >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                      {gain >= 0 ? '+' : ''}{gainPercent}%
                    </div>
                  </div>
                </div>

                <button className="w-full mt-3 text-sm text-emerald-900 font-semibold py-2 rounded-lg border border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                  View details
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
