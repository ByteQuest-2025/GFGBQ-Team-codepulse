import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestment } from '../context/InvestmentContext';
import { useApp } from '../context/AppContext';
import BottomNav from '../components/common/BottomNav';

/**
 * Profile Page
 * User settings and information
 */
const ProfilePage = () => {
  const navigate = useNavigate();
  const { getPortfolioSummary } = useInvestment();
  const { user, language, updateLanguage, logout, t } = useApp();
  const [activeNav, setActiveNav] = React.useState('profile');

  const summary = getPortfolioSummary();

  const handleNavigation = (page) => {
    setActiveNav(page);
    if (page === 'home') {
      navigate('/home');
    } else {
      navigate(`/${page}`);
    }
  };

  const userInfo = user || {
    name: t('profile.guest', 'Guest User'),
    phone: t('profile.not_logged_in', 'Not logged in'),
    language: language || 'English',
    joinDate: new Date().toISOString()
  };

  const menuItems = [
    { icon: '🌐', title: t('profile.menu.language', 'Change Language'), action: 'language' },
    { icon: '💳', title: t('profile.menu.payment', 'Payment Methods'), action: 'payment', tag: t('profile.menu.soon', 'Coming soon') },
    { icon: '📄', title: t('profile.menu.documents', 'Documents & KYC'), action: 'documents', tag: t('profile.menu.soon', 'Coming soon') },
    { icon: '❓', title: t('profile.menu.help', 'Help & Support'), action: 'help' },
    { icon: '📜', title: t('profile.menu.legal', 'Terms & Privacy'), action: 'legal' }
  ];

  const handleMenuAction = (action) => {
    switch (action) {
      case 'language': {
        const next = language === 'en' ? 'hi' : 'en';
        updateLanguage(next);
        alert(t('profile.language.updated', 'Language set to {lang}', { lang: next === 'en' ? 'English' : 'Hindi' }));
        break;
      }
      case 'help': {
        navigate('/support');
        break;
      }
      case 'legal': {
        navigate('/terms');
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-green-600 text-white p-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-white rounded-full mx-auto mb-3 flex items-center justify-center text-4xl">
            👤
          </div>
          <h2 className="text-xl font-bold">{userInfo.name}</h2>
          <p className="text-sm opacity-90 mt-1">{userInfo.phone}</p>
          <p className="text-xs opacity-75 mt-1">
            {t('profile.member_since', 'Member since {date}', { date: new Date(userInfo.joinDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) })}
          </p>
        </div>
      </div>

      <div className="p-4">
        {/* Personal info */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-2xl">👤</div>
            <div>
              <p className="text-sm text-gray-500">{t('profile.label.name', 'Name')}</p>
              <p className="font-semibold text-emerald-950">{userInfo.name}</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-emerald-900/80">
            <div>
              <p className="text-gray-500">{t('profile.label.phone', 'Phone')}</p>
              <p className="font-semibold text-emerald-950">{userInfo.phone}</p>
            </div>
            <div>
              <p className="text-gray-500">{t('profile.label.language', 'Language')}</p>
              <p className="font-semibold text-emerald-950">{userInfo.language || language}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
            <div className="text-2xl font-bold text-green-600">₹{summary.totalInvested.toLocaleString('en-IN')}</div>
            <div className="text-xs text-gray-500 mt-1">{t('profile.stats.invested', 'Total Invested')}</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">{summary.investmentCount}</div>
            <div className="text-xs text-gray-500 mt-1">{t('profile.stats.count', 'Investments')}</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
            <div className="text-2xl font-bold text-purple-600">₹{Math.round(summary.totalGain).toLocaleString('en-IN')}</div>
            <div className="text-xs text-gray-500 mt-1">{t('profile.stats.returns', 'Returns')}</div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-all"
              onClick={() => handleMenuAction(item.action)}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{item.icon}</span>
                <span className="font-medium">{item.title}</span>
              </div>
              <div className="flex items-center">
                {item.tag && (
                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full mr-2 font-semibold">
                    {item.tag}
                  </span>
                )}
                <span className="text-gray-400">→</span>
              </div>
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="w-full mt-6 py-3 bg-red-50 text-red-600 rounded-lg font-semibold border-2 border-red-200 hover:bg-red-100 transition-all"
        >
          🚪 {t('profile.logout', 'Logout')}
        </button>

        {/* App Version */}
        <p className="text-center text-xs text-gray-400 mt-4">
          Version 1.0.0 • Made in India 🇮🇳
        </p>
      </div>

      <BottomNav active={activeNav} onNavigate={handleNavigation} />
    </div>
  );
};

export default ProfilePage;
