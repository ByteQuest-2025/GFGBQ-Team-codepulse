/**
 * Utility Functions
 * Common helper functions used across the app
 */

/**
 * Format currency to Indian Rupee format
 */
export const formatCurrency = (amount, includeSymbol = true) => {
  const formatted = amount.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
  
  return includeSymbol ? `₹${formatted}` : formatted;
};

/**
 * Format date to Indian format
 */
export const formatDate = (date, format = 'short') => {
  const d = new Date(date);
  
  if (format === 'short') {
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }
  
  if (format === 'long') {
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
  
  return d.toLocaleDateString('en-IN');
};

/**
 * Calculate percentage
 */
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return ((value / total) * 100).toFixed(2);
};

/**
 * Validate phone number (Indian format)
 */
export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
};

/**
 * Validate amount
 */
export const validateAmount = (amount, min, max) => {
  const num = parseFloat(amount);
  return !isNaN(num) && num >= min && num <= max;
};

/**
 * Generate unique ID
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Debounce function for performance optimization
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Check if device is low-end
 */
export const isLowEndDevice = () => {
  // Check for low memory
  if (navigator.deviceMemory && navigator.deviceMemory < 4) {
    return true;
  }
  
  // Check for slow connection
  if (navigator.connection) {
    const conn = navigator.connection;
    if (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g') {
      return true;
    }
  }
  
  return false;
};

/**
 * Compress data for storage (simple implementation)
 */
export const compressData = (data) => {
  return JSON.stringify(data);
};

/**
 * Decompress data
 */
export const decompressData = (compressed) => {
  try {
    return JSON.parse(compressed);
  } catch (e) {
    return null;
  }
};

/**
 * Calculate investment maturity date
 */
export const calculateMaturityDate = (startDate, lockInPeriod) => {
  const start = new Date(startDate);
  
  if (lockInPeriod === 'None') {
    return null;
  }
  
  // Parse lock-in period (e.g., "5 years", "6 months")
  const match = lockInPeriod.match(/(\d+)\s*(year|month)/i);
  if (!match) return null;
  
  const value = parseInt(match[1]);
  const unit = match[2].toLowerCase();
  
  if (unit === 'year') {
    start.setFullYear(start.getFullYear() + value);
  } else if (unit === 'month') {
    start.setMonth(start.getMonth() + value);
  }
  
  return start;
};

/**
 * Get risk level color
 */
export const getRiskColor = (risk) => {
  const colors = {
    'very-low': 'text-green-700 bg-green-100',
    'low': 'text-green-600 bg-green-50',
    'medium': 'text-yellow-600 bg-yellow-50',
    'high': 'text-red-600 bg-red-50'
  };
  
  return colors[risk] || colors['low'];
};
