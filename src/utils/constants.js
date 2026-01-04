/**
 * Constants
 * App-wide constants and configuration
 */

// Investment Categories
export const INVESTMENT_CATEGORIES = {
  SAVINGS: 'savings',
  TAX_SAVING: 'tax-saving',
  FIXED_INCOME: 'fixed-income',
  CHILD_WELFARE: 'child-welfare'
};

// Risk Levels
export const RISK_LEVELS = {
  VERY_LOW: 'very-low',
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

// Transaction Types
export const TRANSACTION_TYPES = {
  CREDIT: 'credit',
  DEBIT: 'debit',
  INTEREST: 'interest',
  FEE: 'fee'
};

// Investment Status
export const INVESTMENT_STATUS = {
  ACTIVE: 'active',
  MATURED: 'matured',
  WITHDRAWN: 'withdrawn',
  PENDING: 'pending'
};

// App Configuration
export const APP_CONFIG = {
  MIN_INVESTMENT: 10,
  MAX_INVESTMENT: 1000000,
  DEFAULT_LANGUAGE: 'en',
  SUPPORTED_LANGUAGES: ['en', 'hi', 'bn', 'te', 'mr', 'ta'],
  CURRENCY: 'INR',
  CURRENCY_SYMBOL: '₹'
};

// API Endpoints (for future use)
export const API_ENDPOINTS = {
  BASE_URL: import.meta.env.VITE_API_URL || 'https://nivesh-saral.onrender.com/api',
  INVESTMENTS: '/investments',
  TRANSACTIONS: '/transactions',
  USER: '/user',
  AUTH: '/auth',
  LESSONS: '/lessons'
};

// Educational Content Categories
export const LESSON_CATEGORIES = {
  BASICS: 'basics',
  INVESTMENTS: 'investments',
  TAX: 'tax',
  ADVANCED: 'advanced'
};

// Lesson Difficulty Levels
export const DIFFICULTY_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced'
};

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Date Formats
export const DATE_FORMATS = {
  SHORT: 'DD MMM YYYY',
  LONG: 'DD MMMM YYYY',
  NUMERIC: 'DD/MM/YYYY'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER: 'user',
  TOKEN: 'token',
  LANGUAGE: 'language',
  THEME: 'theme',
  ONBOARDING: 'onboarding_complete'
};

// Performance Settings for Low-End Devices
export const PERFORMANCE_CONFIG = {
  ENABLE_ANIMATIONS: true,
  IMAGE_QUALITY: 'medium', // low, medium, high
  LAZY_LOAD_IMAGES: true,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  MAX_CACHE_SIZE: 50 // Number of items
};

// Validation Rules
export const VALIDATION_RULES = {
  PHONE_MIN_LENGTH: 10,
  PHONE_MAX_LENGTH: 10,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  AMOUNT_DECIMAL_PLACES: 2
};
