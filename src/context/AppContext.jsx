import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage, STORAGE_KEYS } from '../utils/storage';
import { authService } from '../services/authService';

const AppContext = createContext();

const normalizeUser = (user) => {
  if (!user) return null;
  return {
    ...user,
    phone: user.phoneNumber || user.phone,
    phoneNumber: user.phoneNumber || user.phone,
    joinDate: user.createdAt || user.joinDate || new Date().toISOString()
  };
};

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

  // Load initial state from storage and refresh profile if token exists
  useEffect(() => {
    const loadInitialState = async () => {
      const savedUser = normalizeUser(storage.get(STORAGE_KEYS.USER));
      const savedToken = storage.get(STORAGE_KEYS.AUTH_TOKEN);
      const savedLanguage = storage.get(STORAGE_KEYS.LANGUAGE, 'en');
      const onboardingComplete = storage.get(STORAGE_KEYS.ONBOARDING_COMPLETE, false);

      if (savedUser) setUser(savedUser);
      if (savedToken) setAuthToken(savedToken);
      setLanguage(savedLanguage);
      setIsOnboardingComplete(onboardingComplete);

      if (savedToken) {
        try {
          const profile = await authService.getProfile(savedToken);
          const normalized = normalizeUser(profile);
          setUser(normalized);
          storage.set(STORAGE_KEYS.USER, normalized);
        } catch (error) {
          console.error('Failed to refresh profile:', error.message);
          logout();
        }
      }

      setIsLoading(false);
    };

    loadInitialState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update user
  const updateUser = (userData) => {
    const normalized = normalizeUser(userData);
    setUser(normalized);
    storage.set(STORAGE_KEYS.USER, normalized);
  };

  // Login with backend
  const login = async ({ phoneNumber, password }) => {
    const data = await authService.login({ phoneNumber, password });
    const normalized = normalizeUser(data);

    setUser(normalized);
    setAuthToken(data.token);
    storage.set(STORAGE_KEYS.USER, normalized);
    storage.set(STORAGE_KEYS.AUTH_TOKEN, data.token);

    // Preserve previous onboarding state or default to false
    const onboardingComplete = storage.get(STORAGE_KEYS.ONBOARDING_COMPLETE, false);
    setIsOnboardingComplete(onboardingComplete);

    return normalized;
  };

  // Register new user
  const register = async ({ name, phoneNumber, password }) => {
    const data = await authService.register({ name, phoneNumber, password });
    const normalized = normalizeUser(data);

    setUser(normalized);
    setAuthToken(data.token);
    storage.set(STORAGE_KEYS.USER, normalized);
    storage.set(STORAGE_KEYS.AUTH_TOKEN, data.token);
    storage.set(STORAGE_KEYS.ONBOARDING_COMPLETE, false);
    setIsOnboardingComplete(false);

    return normalized;
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
    register,
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
