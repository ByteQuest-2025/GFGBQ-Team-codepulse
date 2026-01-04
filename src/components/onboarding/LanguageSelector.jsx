import React from 'react';
import { useApp } from '../../context/AppContext';

/**
 * Language Selection Component
 * Supports multiple Indian languages for accessibility
 */
const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
];

const LanguageSelector = ({ selectedLanguage, onSelect }) => {
  const { t } = useApp();

  return (
    <div className="rounded-3xl border border-emerald-100 bg-white/90 backdrop-blur-sm p-8 shadow-[0_18px_60px_rgba(12,53,43,0.12)]">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-emerald-950">{t('language.title', 'Choose your language')}</h2>
      <p className="text-sm text-center text-emerald-900/70 mt-2">{t('language.subtitle', 'Switch anytime in settings.')}</p>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onSelect(lang.code)}
            className={`rounded-2xl border-2 p-4 text-left transition-all shadow-sm ${
              selectedLanguage === lang.code
                ? 'border-emerald-900 bg-emerald-50 shadow-emerald-900/10'
                : 'border-emerald-100 bg-white hover:border-emerald-300'
            }`}
          >
            <div className="text-lg font-semibold text-emerald-950">{lang.native}</div>
            <div className="text-xs text-emerald-900/70">{lang.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
