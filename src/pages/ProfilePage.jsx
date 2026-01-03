import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/common/BottomNav';

/**
 * Profile Page
 * User settings and information
 */
const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = React.useState('profile');

  const handleNavigation = (page) => {
    setActiveNav(page);
    if (page === 'home') {
      navigate('/');
    } else {
      navigate(`/${page}`);
    }
  };

  const user = {
    name: 'Ramesh Kumar',
    phone: '+91 98765 43210',
    language: 'Hindi',
    joinDate: '2025-11-01'
  };

  const menuItems = [
    { icon: '👤', title: 'Personal Information', action: 'profile' },
    { icon: '🔔', title: 'Notifications', badge: '2', action: 'notifications' },
    { icon: '🌐', title: 'Change Language', action: 'language' },
    { icon: '💳', title: 'Payment Methods', action: 'payment' },
    { icon: '📄', title: 'Documents & KYC', action: 'documents' },
    { icon: '❓', title: 'Help & Support', action: 'help' },
    { icon: '📜', title: 'Terms & Privacy', action: 'legal' },
    { icon: '⭐', title: 'Rate Our App', action: 'rate' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-green-600 text-white p-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-white rounded-full mx-auto mb-3 flex items-center justify-center text-4xl">
            👤
          </div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-sm opacity-90 mt-1">{user.phone}</p>
          <p className="text-xs opacity-75 mt-1">
            Member since {new Date(user.joinDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="p-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
            <div className="text-2xl font-bold text-green-600">₹2,080</div>
            <div className="text-xs text-gray-500 mt-1">Total Invested</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">2</div>
            <div className="text-xs text-gray-500 mt-1">Investments</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
            <div className="text-2xl font-bold text-purple-600">3</div>
            <div className="text-xs text-gray-500 mt-1">Lessons Done</div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-all"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{item.icon}</span>
                <span className="font-medium">{item.title}</span>
              </div>
              <div className="flex items-center">
                {item.badge && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full mr-2">
                    {item.badge}
                  </span>
                )}
                <span className="text-gray-400">→</span>
              </div>
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <button className="w-full mt-6 py-3 bg-red-50 text-red-600 rounded-lg font-semibold border-2 border-red-200 hover:bg-red-100 transition-all">
          🚪 Logout
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
