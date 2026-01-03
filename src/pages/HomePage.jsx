import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestment } from '../context/InvestmentContext';
import PortfolioSummary from '../components/dashboard/PortfolioSummary';
import InvestmentList from '../components/dashboard/InvestmentList';
import BottomNav from '../components/common/BottomNav';
import LoadingSpinner from '../components/common/LoadingSpinner';

/**
 * Home/Dashboard Page
 * Main screen showing portfolio overview
 */
const HomePage = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('home');
  const { portfolio, getPortfolioSummary, isLoading, updateInvestmentValues } = useInvestment();

  // Update investment values on mount and periodically
  useEffect(() => {
    updateInvestmentValues();
    
    // Auto-refresh every 5 minutes to keep values current
    const interval = setInterval(() => {
      updateInvestmentValues();
    }, 300000); // 5 minutes
    
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
    return <LoadingSpinner message="Loading your portfolio..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-green-600 text-white p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Welcome Back! 👋</h1>
            <p className="text-sm opacity-90 mt-1">
              {portfolio.length > 0 
                ? `${portfolio.length} active investment${portfolio.length > 1 ? 's' : ''}` 
                : "Let's start your investment journey"}
            </p>
          </div>
          <button className="p-2 bg-white bg-opacity-20 rounded-lg">
            🔔
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <PortfolioSummary portfolio={portfolio} />
        <InvestmentList investments={portfolio} />

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button 
            onClick={() => navigate('/learn')}
            className="bg-white p-4 rounded-lg border border-gray-200 text-center hover:border-green-400 hover:shadow-md transition-all"
          >
            <span className="text-3xl">📚</span>
            <div className="mt-2 font-semibold text-sm">Learn</div>
            <div className="text-xs text-gray-500">New lesson available</div>
          </button>
          <button 
            onClick={() => navigate('/invest')}
            className="bg-white p-4 rounded-lg border border-gray-200 text-center hover:border-green-400 hover:shadow-md transition-all"
          >
            <span className="text-3xl">🎯</span>
            <div className="mt-2 font-semibold text-sm">Start Investing</div>
            <div className="text-xs text-gray-500">Browse safe options</div>
          </button>
        </div>
      </div>

      <BottomNav active={activeNav} onNavigate={handleNavigation} />
    </div>
  );
};

export default HomePage;
