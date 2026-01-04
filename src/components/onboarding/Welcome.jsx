import React from 'react';
import { useApp } from '../../context/AppContext';

/**
 * Welcome Screen - First impression for new users
 * Simple, trust-building messaging in local language
 */
const Welcome = ({ onNext }) => {
  const { t } = useApp();

  return (
    <div className="rounded-3xl border border-emerald-100 bg-white/90 backdrop-blur-sm p-10 text-center shadow-[0_18px_60px_rgba(12,53,43,0.12)]">
      <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-800 px-3 py-1 text-xs font-semibold">
        {t('onboarding.welcome.security', 'Safe • Simple • Secure')}
      </p>
      <h1 className="mt-4 text-3xl font-bold text-emerald-950">{t('onboarding.welcome.title', 'Welcome! 🙏')}</h1>
      <p className="mt-3 text-lg text-emerald-900/80">{t('onboarding.welcome.subtitle', 'Start investing with just ₹10')}</p>
      <p className="text-sm text-emerald-900/70">{t('onboarding.welcome.body', 'Bank-grade security, designed for everyone.')}</p>

      <button
        onClick={onNext}
        className="mt-8 w-full rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 hover:bg-emerald-800 transition-colors"
      >
        {t('onboarding.welcome.cta', 'Get started')}
      </button>
    </div>
  );
};

export default Welcome;
