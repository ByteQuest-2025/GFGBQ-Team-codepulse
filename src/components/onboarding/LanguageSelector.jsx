import React from 'react';

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
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Choose Your Language</h2>
      <div className="grid grid-cols-2 gap-3">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onSelect(lang.code)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedLanguage === lang.code
                ? 'border-green-600 bg-green-50'
                : 'border-gray-200 hover:border-green-300'
            }`}
          >
            <div className="text-lg font-semibold">{lang.native}</div>
            <div className="text-xs text-gray-500">{lang.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
