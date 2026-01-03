import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage, STORAGE_KEYS } from '../utils/storage';

const AppContext = createContext();

/**
 * Global App Context Provider
 * Manages app-wide state (user, language, theme, etc.)
 */
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [language, setLanguage] = useState('en');
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial state from storage
  useEffect(() => {
    const loadInitialState = () => {
      const savedUser = storage.get(STORAGE_KEYS.USER);
      const savedToken = storage.get(STORAGE_KEYS.AUTH_TOKEN);
      const savedLanguage = storage.get(STORAGE_KEYS.LANGUAGE, 'en');
      const onboardingComplete = storage.get(STORAGE_KEYS.ONBOARDING_COMPLETE, false);

      if (savedUser) setUser(savedUser);
      if (savedToken) setAuthToken(savedToken);
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

  // Mock login (client-side)
  const login = ({ name, phone }) => {
    const token = `token-${Date.now()}`;
    const userData = {
      name,
      phone,
      joinDate: new Date().toISOString()
    };

    setUser(userData);
    setAuthToken(token);
    storage.set(STORAGE_KEYS.USER, userData);
    storage.set(STORAGE_KEYS.AUTH_TOKEN, token);
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
    setAuthToken(null);
    storage.remove(STORAGE_KEYS.USER);
    storage.remove(STORAGE_KEYS.AUTH_TOKEN);
    storage.remove(STORAGE_KEYS.ONBOARDING_COMPLETE);
    setIsOnboardingComplete(false);
  };

  const value = {
    user,
    updateUser,
    login,
    authToken,
    isAuthenticated: Boolean(authToken),
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
