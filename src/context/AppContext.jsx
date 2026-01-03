import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage, STORAGE_KEYS } from '../utils/storage';

const AppContext = createContext();

/**
 * Global App Context Provider
 * Manages app-wide state (user, language, theme, etc.)
 */
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('en');
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial state from storage
  useEffect(() => {
    const loadInitialState = () => {
      const savedUser = storage.get(STORAGE_KEYS.USER);
      const savedLanguage = storage.get(STORAGE_KEYS.LANGUAGE, 'en');
      const onboardingComplete = storage.get(STORAGE_KEYS.ONBOARDING_COMPLETE, false);

      if (savedUser) setUser(savedUser);
      setLanguage(savedLanguage);
      setIsOnboardingComplete(onboardingComplete);
      setIsLoading(false);
    };

    loadInitialState();
  }, []);

  // Update user
  const updateUser = (userData) => {
    setUser(userData);
    storage.set(STORAGE_KEYS.USER, userData);
  };

  // Update language
  const updateLanguage = (lang) => {
    setLanguage(lang);
    storage.set(STORAGE_KEYS.LANGUAGE, lang);
  };

  // Complete onboarding
  const completeOnboarding = () => {
    setIsOnboardingComplete(true);
    storage.set(STORAGE_KEYS.ONBOARDING_COMPLETE, true);
  };

  // Logout
  const logout = () => {
    setUser(null);
    storage.remove(STORAGE_KEYS.USER);
    storage.remove(STORAGE_KEYS.AUTH_TOKEN);
  };

  const value = {
    user,
    updateUser,
    language,
    updateLanguage,
    isOnboardingComplete,
    completeOnboarding,
    isLoading,
    logout
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
