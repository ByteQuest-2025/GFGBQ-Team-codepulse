import React from 'react';
import { useApp } from '../../context/AppContext';

const Icon = ({ type }) => {
  const base = 'h-6 w-6';
  switch (type) {
    case 'home':
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11.5 12 4l9 7.5" />
          <path d="M5 10.5v8.5a1 1 0 0 0 1 1h4v-5h4v5h4a1 1 0 0 0 1-1v-8.5" />
        </svg>
      );
    case 'invest':
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 16c2 0 3-4 5-4s3 4 5 4 3-4 5-4" />
          <path d="M4 20h16" />
          <circle cx="12" cy="8" r="3.2" />
        </svg>
      );
    case 'learn':
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6.5 12 4l8 2.5-8 2.5-8-2.5Z" />
          <path d="M4 12l8 2.5 8-2.5" />
          <path d="M4 9.25V16l8 2.5 8-2.5V9.25" />
        </svg>
      );
    case 'passbook':
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="4" width="14" height="16" rx="2" />
          <path d="M9 8h6M9 12h6M9 16h3" />
        </svg>
      );
    case 'profile':
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8.5" r="3.2" />
          <path d="M6.5 19.5c0-2.5 2.4-4.5 5.5-4.5s5.5 2 5.5 4.5" />
        </svg>
      );
    default:
      return null;
  }
};

/**
 * Bottom Navigation Bar
 * Stylized navigation with custom icons
 */
const BottomNav = ({ active, onNavigate }) => {
  const { t } = useApp();

  const navItems = [
    { id: 'home', icon: 'home', label: t('bottom.home', 'Home') },
    { id: 'invest', icon: 'invest', label: t('bottom.invest', 'Invest') },
    { id: 'learn', icon: 'learn', label: t('bottom.learn', 'Learn') },
    { id: 'passbook', icon: 'passbook', label: t('bottom.passbook', 'Passbook') },
    { id: 'profile', icon: 'profile', label: t('bottom.profile', 'Profile') }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 px-3 pb-2 pt-2 bg-gradient-to-r from-emerald-50 via-white to-cyan-50/80 backdrop-blur-md border-t border-emerald-100/70 shadow-[0_-10px_40px_rgba(12,53,43,0.12)] safe-area-bottom">
      <div className="flex justify-around items-center max-w-2xl mx-auto gap-2">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              aria-label={item.label}
              className={`group flex flex-col items-center justify-center flex-1 min-w-0 py-1.5 transition-all rounded-2xl ${
                isActive
                  ? 'text-emerald-900 font-semibold'
                  : 'text-emerald-900/65 hover:text-emerald-900'
              }`}
            >
              <div
                className={`relative flex items-center justify-center h-11 w-11 rounded-2xl transition-all border ${
                  isActive
                    ? 'bg-white/80 border-emerald-200 shadow-[0_10px_30px_rgba(16,185,129,0.18)]'
                    : 'bg-white/40 border-transparent'
                }`}
              >
                <Icon type={item.icon} />
                {isActive && <span className="absolute -bottom-2 h-1.5 w-6 rounded-full bg-emerald-500/80" />}
              </div>
              <span className="text-xs mt-2 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
