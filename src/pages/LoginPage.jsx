import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isOnboardingComplete, isLoading } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  if (isLoading) {
    return <LoadingSpinner message="Loading..." />;
  }

  useEffect(() => {
    if (isAuthenticated) {
      const next = isOnboardingComplete ? '/' : '/onboarding';
      navigate(next, { replace: true });
    }
  }, [isAuthenticated, isOnboardingComplete, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !phone.trim()) {
      setError('Please enter your name and phone number.');
      return;
    }

    login({ name: name.trim(), phone: phone.trim() });
    const next = isOnboardingComplete ? '/' : '/onboarding';
    navigate(next, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-50 text-green-700 text-2xl mb-3">
            💸
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome to MicroInvest</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to continue your journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Priya Sharma"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., +91 98765 43210"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-sm"
          >
            Continue
          </button>

          <p className="text-xs text-center text-gray-400">
            By continuing you agree to our Terms & Privacy.
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
