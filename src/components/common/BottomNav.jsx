import React from 'react';
import { useApp } from '../../context/AppContext';

/**
 * Bottom Navigation Bar
 * Simple navigation for main sections
 */
const BottomNav = ({ active, onNavigate }) => {
  const { t } = useApp();

  const navItems = [
    { id: 'home', icon: '🏠', label: t('bottom.home', 'Home') },
    { id: 'invest', icon: '💰', label: t('bottom.invest', 'Invest') },
    { id: 'learn', icon: '📚', label: t('bottom.learn', 'Learn') },
    { id: 'passbook', icon: '📖', label: t('bottom.passbook', 'Passbook') },
    { id: 'profile', icon: '👤', label: t('bottom.profile', 'Profile') }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/85 backdrop-blur-md border-t border-emerald-100 px-2 py-2 shadow-[0_-6px_24px_rgba(12,53,43,0.08)] safe-area-bottom">
      <div className="flex justify-around items-center max-w-2xl mx-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 transition-all rounded-xl ${
              active === item.id
                ? 'text-emerald-900 bg-emerald-50 font-semibold'
                : 'text-emerald-900/60 hover:text-emerald-900'
            }`}
          >
            <span className="text-2xl mb-1">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
