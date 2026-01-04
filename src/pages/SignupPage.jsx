import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const SignupPage = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated, isOnboardingComplete, isLoading, t } = useApp();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const next = isOnboardingComplete ? '/' : '/onboarding';
      navigate(next, { replace: true });
    }
  }, [isAuthenticated, isOnboardingComplete, navigate]);

  if (isLoading) {
    return <LoadingSpinner message={t('common.loading', 'Loading...')} />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!name.trim() || !phoneNumber.trim() || !password.trim()) {
      setError(t('signup.error_required', 'Please fill all required fields.'));
      setIsSubmitting(false);
      return;
    }

    if (password.length < 6) {
      setError(t('signup.error_password_length', 'Password must be at least 6 characters.'));
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setError(t('signup.error_password_mismatch', 'Passwords do not match.'));
      setIsSubmitting(false);
      return;
    }

    try {
      await register({ name: name.trim(), phoneNumber: phoneNumber.trim(), password: password.trim() });
      navigate('/onboarding', { replace: true });
    } catch (err) {
      setError(err.message || t('signup.error_generic', 'Unable to create account. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-50 text-green-700 text-2xl mb-3">
            ✨
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{t('signup.title', 'Create your account')}</h1>
          <p className="text-sm text-gray-500 mt-1">{t('signup.subtitle', 'Start your investing journey in minutes')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('common.full_name', 'Full Name')}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Priya Sharma"
            />
          </div>

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
              placeholder="At least 6 characters"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">{t('common.confirm_password', 'Confirm Password')}</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Re-enter your password"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('signup.submit_loading', 'Creating account...') : t('signup.submit', 'Sign up')}
          </button>

          <p className="text-sm text-center text-gray-500">
            {t('common.already_account', 'Already have an account?')}{' '}
            <Link to="/login" className="text-green-700 font-semibold hover:underline">
              {t('signup.link_login', 'Sign in')}
            </Link>
          </p>

          <p className="text-xs text-center text-gray-400">
            {t('signup.agree', 'By signing up you agree to our Terms & Privacy.')}
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
