import React, { useState } from 'react';
import Welcome from '../components/onboarding/Welcome';
import LanguageSelector from '../components/onboarding/LanguageSelector';
import TrustBuilding from '../components/onboarding/TrustBuilding';
import { useApp } from '../context/AppContext';

/**
 * Onboarding Flow Page
 * Guides new users through initial setup
 */
const OnboardingPage = ({ onComplete }) => {
  const { language, updateLanguage } = useApp();
  const [step, setStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang);
    updateLanguage(lang);
    setStep(2);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Welcome onNext={() => setStep(1)} />;
      case 1:
        return <LanguageSelector selectedLanguage={selectedLanguage} onSelect={handleLanguageSelect} />;
      case 2:
        return <TrustBuilding onNext={() => onComplete(selectedLanguage)} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f4f1e6] text-emerald-950">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute top-[-15%] left-[5%] h-56 w-56 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute top-[25%] right-[0%] h-56 w-56 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[30%] h-64 w-64 rounded-full bg-emerald-100/30 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-xl px-4 py-10">
        {renderStep()}
      </div>
    </div>
  );
};

export default OnboardingPage;
