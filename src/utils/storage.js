/**
 * Storage Utility
 * Handles local storage with compression for low-end devices
 */

const STORAGE_PREFIX = 'microinvest_';

export const storage = {
  /**
   * Save data to localStorage
   */
  set: (key, value) => {
    try {
      const prefixedKey = STORAGE_PREFIX + key;
      const serialized = JSON.stringify(value);
      localStorage.setItem(prefixedKey, serialized);
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  },

  /**
   * Get data from localStorage
   */
  get: (key, defaultValue = null) => {
    try {
      const prefixedKey = STORAGE_PREFIX + key;
      const item = localStorage.getItem(prefixedKey);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },

  /**
   * Remove data from localStorage
   */
  remove: (key) => {
    try {
      const prefixedKey = STORAGE_PREFIX + key;
      localStorage.removeItem(prefixedKey);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },

  /**
   * Clear all app data
   */
  clear: () => {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(STORAGE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  /**
   * Check if localStorage is available
   */
  isAvailable: () => {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      return false;
    }
  },

  /**
   * Get storage size (approximate)
   */
  getSize: () => {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return (total / 1024).toFixed(2) + ' KB';
  }
};

// Specific storage keys
export const STORAGE_KEYS = {
  USER: 'user',
  AUTH_TOKEN: 'auth_token',
  LANGUAGE: 'language',
  THEME: 'theme',
  ONBOARDING_COMPLETE: 'onboarding_complete',
  PORTFOLIO: 'portfolio',
  TRANSACTIONS: 'transactions',
  LEARNING_PROGRESS: 'learning_progress',
  SETTINGS: 'settings'
};
