import React from 'react';

/**
 * Bottom Navigation Bar
 * Simple navigation for main sections
 */
const BottomNav = ({ active, onNavigate }) => {
  const navItems = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'invest', icon: '💰', label: 'Invest' },
    { id: 'learn', icon: '📚', label: 'Learn' },
    { id: 'passbook', icon: '📖', label: 'Passbook' },
    { id: 'profile', icon: '👤', label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 safe-area-bottom">
      <div className="flex justify-around items-center max-w-2xl mx-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 transition-all ${
              active === item.id
                ? 'text-green-600'
                : 'text-gray-500'
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
