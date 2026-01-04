import React from 'react';
import { LANGUAGES } from '../../i18n/translations';
import { useApp } from '../../context/AppContext';

const LANGUAGE_LABELS = {
  en: 'English',
  hi: 'हिंदी',
  bn: 'বাংলা',
  te: 'తెలుగు',
  mr: 'मराठी',
  ta: 'தமிழ்'
};

const LanguageToggle = () => {
  const { language, updateLanguage, t } = useApp();

  return (
    <label className="flex items-center gap-2 text-xs font-semibold text-emerald-900/80">
      <span>{t('common.language_label', 'Choose your language')}</span>
      <select
        value={language}
        onChange={(e) => updateLanguage(e.target.value)}
        className="rounded-full border border-emerald-200 bg-white px-3 py-2 text-sm font-semibold text-emerald-900 shadow-sm hover:border-emerald-300"
      >
        {LANGUAGES.map((code) => (
          <option key={code} value={code}>
            {LANGUAGE_LABELS[code] || code.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
};

export default LanguageToggle;
