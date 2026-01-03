import React, { useState } from 'react';
import Welcome from '../components/onboarding/Welcome';
import LanguageSelector from '../components/onboarding/LanguageSelector';
import TrustBuilding from '../components/onboarding/TrustBuilding';

/**
 * Onboarding Flow Page
 * Guides new users through initial setup
 */
const OnboardingPage = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [language, setLanguage] = useState('en');

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setStep(2);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Welcome onNext={() => setStep(1)} />;
      case 1:
        return <LanguageSelector selectedLanguage={language} onSelect={handleLanguageSelect} />;
      case 2:
        return <TrustBuilding onNext={() => onComplete(language)} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {renderStep()}
    </div>
  );
};

export default OnboardingPage;
