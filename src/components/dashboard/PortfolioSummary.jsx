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
    <div className="rounded-2xl border border-emerald-100 bg-white/80 backdrop-blur-sm p-6 shadow-[0_12px_40px_rgba(12,53,43,0.1)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-emerald-800">Portfolio overview</p>
          <p className="text-xs text-emerald-900/70">Updated now</p>
        </div>
        <span className="rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-semibold">Live</span>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-2 rounded-xl bg-emerald-950 text-white p-5 shadow-[0_10px_40px_rgba(12,53,43,0.35)]">
          <p className="text-xs text-white/70">Total value</p>
          <p className="mt-2 text-3xl font-bold">₹{totalCurrent.toFixed(2)}</p>
          <p className="mt-2 text-sm text-emerald-100">Returns: ₹{totalGain.toFixed(2)} ({gainPercentage > 0 ? '+' : ''}{gainPercentage}%)</p>
          <div className="mt-4 flex gap-2 text-xs text-white/70">
            <span className="rounded-full bg-white/10 px-3 py-1">Liquid ready</span>
            <span className="rounded-full bg-white/10 px-3 py-1">Risk-checked</span>
          </div>
        </div>
        <div className="grid grid-rows-2 gap-3">
          <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
            <p className="text-xs text-emerald-900/70">Invested</p>
            <p className="mt-1 text-xl font-semibold text-emerald-950">₹{totalInvested}</p>
          </div>
          <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
            <p className="text-xs text-emerald-900/70">Growth</p>
            <p className={`mt-1 text-xl font-semibold ${totalGain >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>₹{totalGain.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <button
          onClick={() => navigate('/invest')}
          className="w-full rounded-full bg-emerald-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 hover:bg-emerald-800 transition-colors"
        >
          + Add money
        </button>
        <button
          onClick={() => navigate('/passbook')}
          className="w-full rounded-full border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-emerald-900 hover:border-emerald-300 transition-colors"
        >
          View passbook
        </button>
      </div>
    </div>
  );
};

export default PortfolioSummary;
