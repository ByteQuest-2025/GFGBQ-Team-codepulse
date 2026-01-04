import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestment } from '../context/InvestmentContext';
import PortfolioSummary from '../components/dashboard/PortfolioSummary';
import InvestmentList from '../components/dashboard/InvestmentList';
import BottomNav from '../components/common/BottomNav';
import LoadingSpinner from '../components/common/LoadingSpinner';
import PageShell from '../components/common/PageShell';

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
      navigate('/home');
    } else {
      navigate(`/${page}`);
    }
  };

  const summary = getPortfolioSummary();

  if (isLoading) {
    return <LoadingSpinner message="Loading your portfolio..." />;
  }

  return (
    <PageShell
      title="Welcome back 👋"
      subtitle={portfolio.length > 0
        ? `${portfolio.length} active investment${portfolio.length > 1 ? 's' : ''}`
        : "Let's start your investment journey"}
      actions={(
        <button className="rounded-full border border-emerald-200 bg-white px-3 py-2 text-sm font-semibold text-emerald-900 hover:border-emerald-300 transition-colors">
          🔔 Notifications
        </button>
      )}
    >
      <PortfolioSummary portfolio={portfolio} />

      <div className="grid gap-4 sm:grid-cols-2">
        <button 
          onClick={() => navigate('/learn')}
          className="rounded-2xl border border-emerald-100 bg-white/80 backdrop-blur-sm p-5 text-left shadow-[0_10px_40px_rgba(12,53,43,0.08)] hover:-translate-y-0.5 transition-transform"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">📚</span>
            <div>
              <p className="text-sm font-semibold text-emerald-950">Learn</p>
              <p className="text-xs text-emerald-900/70">New lesson available</p>
            </div>
          </div>
        </button>
        <button 
          onClick={() => navigate('/invest')}
          className="rounded-2xl border border-emerald-100 bg-white/80 backdrop-blur-sm p-5 text-left shadow-[0_10px_40px_rgba(12,53,43,0.08)] hover:-translate-y-0.5 transition-transform"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎯</span>
            <div>
              <p className="text-sm font-semibold text-emerald-950">Start investing</p>
              <p className="text-xs text-emerald-900/70">Browse safe options</p>
            </div>
          </div>
        </button>
      </div>

      <InvestmentList investments={portfolio} />

      <BottomNav active={activeNav} onNavigate={handleNavigation} />
    </PageShell>
  );
};

export default HomePage;
