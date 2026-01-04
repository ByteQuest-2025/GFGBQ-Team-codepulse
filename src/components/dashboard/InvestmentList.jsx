import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestment } from '../../context/InvestmentContext';

/**
 * Investment List Component
 * Shows all active investments in simple format
 */
const InvestmentList = ({ investments }) => {
  const navigate = useNavigate();
  const { withdrawFromInvestment } = useInvestment();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalInvestment, setModalInvestment] = useState(null);
  const [amount, setAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const openModal = (inv) => {
    setModalInvestment(inv);
    setAmount('');
    setError('');
    setModalOpen(true);
  };

  const closeModal = () => {
    if (submitting) return;
    setModalOpen(false);
    setModalInvestment(null);
    setAmount('');
    setError('');
  };

  const submitWithdraw = async () => {
    if (!modalInvestment) return;
    const num = Number(amount);
    if (Number.isNaN(num) || num <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    if (num > modalInvestment.currentValue) {
      setError('Amount exceeds this investment balance');
      return;
    }
    try {
      setSubmitting(true);
      setError('');
      await withdrawFromInvestment(modalInvestment.id, num);
      closeModal();
      // Optionally notify success via toast/alert if desired
    } catch (err) {
      setError(err.message || 'Withdrawal failed');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
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
                <button
                  className="w-full mt-2 text-sm font-semibold py-2 rounded-lg border border-red-200 text-red-700 hover:border-red-300 hover:bg-red-50 transition-colors"
                  onClick={() => openModal(investment)}
                >
                  Withdraw
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>

    {modalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-emerald-950">Withdraw funds</h3>
              <p className="text-sm text-emerald-900/70">
                {modalInvestment?.name} • Available ₹{modalInvestment?.currentValue?.toFixed(2)}
              </p>
            </div>
            <button
              onClick={closeModal}
              className="text-emerald-900/60 hover:text-emerald-900"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="mt-4 space-y-2">
            <label className="text-sm font-semibold text-emerald-900" htmlFor="withdraw-amount">Amount</label>
            <input
              id="withdraw-amount"
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-lg border border-emerald-200 px-3 py-2 text-emerald-950 focus:border-emerald-400 focus:outline-none"
              placeholder="Enter amount"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={closeModal}
              disabled={submitting}
              className="w-full rounded-lg border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-900 hover:border-emerald-300 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              onClick={submitWithdraw}
              disabled={submitting}
              className="w-full rounded-lg bg-emerald-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 hover:bg-emerald-800 disabled:opacity-60"
            >
              {submitting ? 'Withdrawing…' : 'Withdraw'}
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default InvestmentList;
