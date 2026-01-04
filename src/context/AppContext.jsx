import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { storage, STORAGE_KEYS } from '../utils/storage';
import { authService } from '../services/authService';
import { translate } from '../i18n/translations';

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

  const userId = user?._id || null;
  const scopedKeys = useMemo(() => ({
    language: `${STORAGE_KEYS.LANGUAGE}_${userId || 'guest'}`,
    onboarding: `${STORAGE_KEYS.ONBOARDING_COMPLETE}_${userId || 'guest'}`,
  }), [userId]);

  // Load initial state from storage and refresh profile if token exists
  useEffect(() => {
    const loadInitialState = async () => {
      const savedUser = normalizeUser(storage.get(STORAGE_KEYS.USER));
      const savedToken = storage.get(STORAGE_KEYS.AUTH_TOKEN);

      // Determine scoped keys based on saved user id (or guest)
      const initialUserId = savedUser?._id || 'guest';
      const initialLangKey = `${STORAGE_KEYS.LANGUAGE}_${initialUserId}`;
      const initialOnboardKey = `${STORAGE_KEYS.ONBOARDING_COMPLETE}_${initialUserId}`;

      const savedLanguage = storage.get(initialLangKey, 'en');
      // Support legacy global onboarding flag as fallback
      const onboardingComplete = storage.get(initialOnboardKey, storage.get(STORAGE_KEYS.ONBOARDING_COMPLETE, false));

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

    const langKey = `${STORAGE_KEYS.LANGUAGE}_${normalized._id}`;
    const onboardKey = `${STORAGE_KEYS.ONBOARDING_COMPLETE}_${normalized._id}`;

    // Preserve previous onboarding state for this user or default to false
    // Fallback to legacy onboarding flag if scoped one missing
    const onboardingComplete = storage.get(onboardKey, storage.get(STORAGE_KEYS.ONBOARDING_COMPLETE, false));
    const savedLanguage = storage.get(langKey, storage.get(STORAGE_KEYS.LANGUAGE, 'en'));

    setLanguage(savedLanguage);
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

    // Reset onboarding for this new user; language defaults to 'en'
    storage.set(`${STORAGE_KEYS.ONBOARDING_COMPLETE}_${normalized._id}`, false);
    storage.set(`${STORAGE_KEYS.LANGUAGE}_${normalized._id}`, 'en');
    setLanguage('en');
    setIsOnboardingComplete(false);

    return normalized;
  };

  // Update language
  const updateLanguage = (lang) => {
    setLanguage(lang);
    storage.set(scopedKeys.language, lang);
  };

  const t = (key, fallback, vars) => translate(language, key, fallback, vars);

  // Complete onboarding
  const completeOnboarding = () => {
    setIsOnboardingComplete(true);
    storage.set(scopedKeys.onboarding, true);
    // Also write legacy key for backward compatibility
    storage.set(STORAGE_KEYS.ONBOARDING_COMPLETE, true);
  };

  // Logout
  const logout = () => {
    const currentUserId = user?._id;
    setUser(null);
    setAuthToken(null);
    storage.remove(STORAGE_KEYS.USER);
    storage.remove(STORAGE_KEYS.AUTH_TOKEN);
    if (currentUserId) {
      storage.remove(`${STORAGE_KEYS.ONBOARDING_COMPLETE}_${currentUserId}`);
      storage.remove(`${STORAGE_KEYS.LANGUAGE}_${currentUserId}`);
    }
    storage.remove(scopedKeys.onboarding);
    storage.remove(scopedKeys.language);
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
    t,
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
