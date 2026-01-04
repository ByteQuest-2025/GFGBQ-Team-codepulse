import React from 'react';
import { Home, IndianRupee, BookOpen, BookText, User } from 'lucide-react';

/**
 * Bottom Navigation Bar
 * Simple navigation for main sections
 */
const BottomNav = ({ active, onNavigate }) => {
  const navItems = [
    { id: 'home', Icon: Home, label: 'Home' },
    { id: 'invest', Icon: IndianRupee, label: 'Invest' },
    { id: 'learn', Icon: BookOpen, label: 'Learn' },
    { id: 'passbook', Icon: BookText, label: 'Passbook' },
    { id: 'profile', Icon: User, label: 'Profile' }
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
            <item.Icon className="w-6 h-6 mb-1" strokeWidth={2} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
