/**
 * Transaction Service
 * Handles all transaction operations
 */

export const transactionService = {
  /**
   * Record a new transaction
   */
  createTransaction: async (userId, transactionData) => {
    const transaction = {
      id: Date.now(),
      userId: userId,
      type: transactionData.type, // 'credit', 'debit', 'interest'
      amount: transactionData.amount,
      investmentId: transactionData.investmentId,
      investmentName: transactionData.investmentName,
      date: new Date().toISOString(),
      status: 'completed',
      description: transactionData.description
    };

    // Transaction record created
    return transaction;
  },

  /**
   * Get user's transaction history
   */
  getUserTransactions: async (userId, filters = {}) => {
    // Returns transactions from local storage
    // filters: { type, startDate, endDate, investmentId }
    return [];
  },

  /**
   * Get transaction summary
   */
  getTransactionSummary: async (userId) => {
    // Returns transaction summary from local storage
    return {
      totalInvested: 0,
      totalWithdrawn: 0,
      totalInterestEarned: 0,
      transactionCount: 0
    };
  },

  /**
   * Export transactions as CSV/PDF
   */
  exportTransactions: async (userId, format = 'csv') => {
    const transactions = await transactionService.getUserTransactions(userId);
    
    if (format === 'csv') {
      const csv = transactionService.convertToCSV(transactions);
      return csv;
    }
    
    // For PDF, use a library like jsPDF
    return null;
  },

  /**
   * Convert transactions to CSV format
   */
  convertToCSV: (transactions) => {
    const header = 'Date,Type,Investment,Amount,Status\n';
    const rows = transactions.map(t => 
      `${t.date},${t.type},${t.investmentName},${t.amount},${t.status}`
    ).join('\n');
    
    return header + rows;
  }
};
