import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestment } from '../context/InvestmentContext';
import BottomNav from '../components/common/BottomNav';
import LoadingSpinner from '../components/common/LoadingSpinner';

/**
 * Passbook Page
 * Complete transaction history in simple format
 */
const PassbookPage = () => {
  const navigate = useNavigate();
  const { transactions, getPortfolioSummary, isLoading } = useInvestment();
  const [activeNav, setActiveNav] = React.useState('passbook');

  const handleNavigation = (page) => {
    setActiveNav(page);
    if (page === 'home') {
      navigate('/');
    } else {
      navigate(`/${page}`);
    }
  };

  const summary = getPortfolioSummary();

  if (isLoading) {
    return <LoadingSpinner message="Loading transactions..." />;
  }

  const getIcon = (type) => {
    switch (type) {
      case 'credit':
        return '💰';
      case 'debit':
        return '💸';
      case 'interest':
        return '📈';
      default:
        return '📝';
    }
  };

  const totalInvested = summary.totalInvested;
  const totalInterest = summary.totalGain;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-green-600 text-white p-4">
        <h1 className="text-xl font-bold">Your Passbook 📖</h1>
        <p className="text-sm opacity-90 mt-1">All your transactions</p>
      </div>

      <div className="p-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-xs text-gray-500 mb-1">Total Invested</div>
            <div className="text-xl font-bold text-green-600">₹{totalInvested}</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-xs text-gray-500 mb-1">Interest Earned</div>
            <div className="text-xl font-bold text-blue-600">₹{totalInterest}</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-2 mb-4">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold">
            All
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-semibold">
            Investments
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-semibold">
            Interest
          </button>
        </div>

        {/* Transactions List */}
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-start">
                <span className="text-3xl mr-3">{getIcon(transaction.type)}</span>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold">{transaction.title}</h3>
                    <span className={`font-bold ${
                      transaction.type === 'debit' ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {transaction.type === 'debit' ? '-' : '+'}₹{transaction.amount}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{transaction.investment}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      {new Date(transaction.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      ✓ {transaction.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Export Button */}
        <button className="w-full mt-6 py-3 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-all">
          📄 Download Statement
        </button>
      </div>

      <BottomNav active={activeNav} onNavigate={handleNavigation} />
    </div>
  );
};

export default PassbookPage;
