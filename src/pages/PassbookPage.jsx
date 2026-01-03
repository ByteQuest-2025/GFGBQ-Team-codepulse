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
  const { transactions, getPortfolioSummary, isLoading, updateInvestmentValues } = useInvestment();
  const [activeNav, setActiveNav] = React.useState('passbook');
  const [filter, setFilter] = React.useState('all'); // Add filter state

  // Auto-refresh for updated values
  React.useEffect(() => {
    updateInvestmentValues();
    
    const interval = setInterval(() => {
      updateInvestmentValues();
    }, 10000); // 0.1 minutes
    
    return () => clearInterval(interval);
  }, []);

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

  // Filter transactions based on selected filter
  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === 'all') return true;
    if (filter === 'investments') return transaction.type === 'credit';
    if (filter === 'interest') return transaction.type === 'interest';
    return true;
  });

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
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${
              filter === 'all' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('investments')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${
              filter === 'investments' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Investments
          </button>
          <button 
            onClick={() => setFilter('interest')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${
              filter === 'interest' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Interest
          </button>
        </div>

        {/* Transactions List */}
        <div className="space-y-3">
          {filteredTransactions.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
              <span className="text-4xl mb-3 block">📭</span>
              <p className="text-gray-500">No transactions found</p>
            </div>
          ) : (
            filteredTransactions.map((transaction) => (
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
          ))
          )}
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
