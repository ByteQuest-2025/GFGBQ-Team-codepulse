import React from 'react';
import { useApp } from '../../context/AppContext';

/**
 * Trust Building Screen
 * Addresses common fears and builds confidence
 */
const TrustBuilding = ({ onNext }) => {
  const { t } = useApp();
  const trustPoints = [
    {
      icon: '🔒',
      title: t('trust.point.safe.title', 'Your Money is Safe'),
      description: t('trust.point.safe.desc', 'Government-regulated investments. Your money is secure.')
    },
    {
      icon: '₹',
      title: t('trust.point.start_small.title', 'Start with Just ₹10'),
      description: t('trust.point.start_small.desc', 'No need for large amounts. Start small, grow gradually.')
    },
    {
      icon: '📚',
      title: t('trust.point.teach.title', 'We Teach You'),
      description: t('trust.point.teach.desc', 'Simple lessons before each step. No confusing terms.')
    },
    {
      icon: '📱',
      title: t('trust.point.accessible.title', 'Works on Any Phone'),
      description: t('trust.point.accessible.desc', 'Designed for basic smartphones and slow internet.')
    }
  ];

  return (
    <div className="rounded-3xl border border-emerald-100 bg-white/90 backdrop-blur-sm p-8 shadow-[0_18px_60px_rgba(12,53,43,0.12)]">
      <h2 className="text-2xl font-bold text-center text-emerald-950 mb-6">{t('trust.title', 'Why trust us?')}</h2>
      <div className="space-y-4">
        {trustPoints.map((point, index) => (
          <div key={index} className="flex items-start gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
            <span className="text-3xl">{point.icon}</span>
            <div>
              <h3 className="font-semibold text-lg text-emerald-950">{point.title}</h3>
              <p className="text-emerald-900/75 text-sm mt-1">{point.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        className="w-full mt-8 rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 hover:bg-emerald-800 transition-colors"
      >
        {t('trust.cta', 'I understand, continue')}
      </button>
    </div>
  );
};

export default TrustBuilding;
