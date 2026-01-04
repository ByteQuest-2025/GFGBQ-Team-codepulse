import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isOnboardingComplete, isLoading, t } = useApp();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) {
    return <LoadingSpinner message={t('common.loading', 'Loading...')} />;
  }

  useEffect(() => {
    if (isAuthenticated) {
      const next = isOnboardingComplete ? '/' : '/onboarding';
      navigate(next, { replace: true });
    }
  }, [isAuthenticated, isOnboardingComplete, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!phoneNumber.trim() || !password.trim()) {
      setError(t('login.error_missing', 'Please enter your phone number and password.'));
      setIsSubmitting(false);
      return;
    }

    try {
      await login({ phoneNumber: phoneNumber.trim(), password: password.trim() });
      const next = isOnboardingComplete ? '/' : '/onboarding';
      navigate(next, { replace: true });
    } catch (err) {
      setError(err.message || t('login.error_generic', 'Unable to login. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-50 text-green-700 text-2xl mb-3">
            💸
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{t('login.title', 'Welcome to MicroInvest')}</h1>
          <p className="text-sm text-gray-500 mt-1">{t('login.subtitle', 'Sign in to continue your journey')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('common.phone_number', 'Phone Number')}</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., +91 98765 43210"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">{t('common.password', 'Password')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('login.submit_loading', 'Signing in...') : t('login.submit', 'Sign in')}
          </button>

          <p className="text-sm text-center text-gray-500">
            {t('common.no_account', "Don't have an account?")}{' '}
            <Link to="/signup" className="text-green-700 font-semibold hover:underline">
              {t('login.link_signup', 'Create an account')}
            </Link>
          </p>

          <p className="text-xs text-center text-gray-400">
            {t('common.terms_privacy', 'By continuing you agree to our Terms & Privacy.')}
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
