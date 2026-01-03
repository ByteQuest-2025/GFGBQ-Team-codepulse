/**
 * Investment Service
 * Handles investment operations and calculations
 */

export const investmentService = {
  /**
   * Get all available investment options
   */
  getInvestmentOptions: async () => {
    // Returns static investment options
    return [
      {
        id: 1,
        name: 'Post Office Savings Account',
        description: 'Government backed, very safe. Withdraw anytime.',
        returns: 4.0,
        risk: 'very-low',
        minAmount: 10,
        maxAmount: 100000,
        lockIn: 'None',
        taxBenefit: false,
        category: 'savings'
      },
      {
        id: 2,
        name: 'Public Provident Fund (PPF)',
        description: 'Long-term savings with tax benefits. Very safe.',
        returns: 7.1,
        risk: 'very-low',
        minAmount: 500,
        maxAmount: 150000,
        lockIn: '15 years',
        taxBenefit: true,
        category: 'tax-saving'
      },
      {
        id: 3,
        name: 'Sukanya Samriddhi Yojana (SSY)',
        description: 'For girl child education and marriage. Government scheme.',
        returns: 8.2,
        risk: 'very-low',
        minAmount: 250,
        maxAmount: 150000,
        lockIn: '21 years',
        taxBenefit: true,
        category: 'child-welfare'
      },
      {
        id: 4,
        name: 'Fixed Deposit (Bank FD)',
        description: 'Guaranteed returns. Money locked for fixed period.',
        returns: 6.5,
        risk: 'low',
        minAmount: 1000,
        maxAmount: 1000000,
        lockIn: '1-5 years',
        taxBenefit: false,
        category: 'fixed-income'
      },
      {
        id: 5,
        name: 'National Savings Certificate (NSC)',
        description: 'Government savings bond with tax benefits.',
        returns: 7.7,
        risk: 'very-low',
        minAmount: 1000,
        maxAmount: 100000,
        lockIn: '5 years',
        taxBenefit: true,
        category: 'tax-saving'
      }
    ];
  },

  /**
   * Calculate investment returns
   */
  calculateReturns: (principal, rate, years) => {
    const amount = principal * Math.pow(1 + rate / 100, years);
    const interest = amount - principal;
    return {
      totalAmount: Math.round(amount * 100) / 100,
      interestEarned: Math.round(interest * 100) / 100,
      principal: principal
    };
  },

  /**
   * Create new investment
   */
  createInvestment: async (userId, investmentData) => {
    // Creates investment record
    const investment = {
      id: Date.now(),
      userId: userId,
      investmentType: investmentData.investmentType,
      amount: investmentData.amount,
      startDate: new Date().toISOString(),
      status: 'active',
      currentValue: investmentData.amount,
      returns: 0
    };

    return investment;
  },

  /**
   * Get user's investments
   */
  getUserInvestments: async (userId) => {
    // Returns user investments from local storage
    return [];
  },

  /**
   * Update investment value (called periodically)
   */
  updateInvestmentValue: (investment, dailyRate) => {
    const updatedValue = investment.currentValue * (1 + dailyRate / 100);
    return {
      ...investment,
      currentValue: Math.round(updatedValue * 100) / 100,
      returns: Math.round((updatedValue - investment.amount) * 100) / 100
    };
  }
};
