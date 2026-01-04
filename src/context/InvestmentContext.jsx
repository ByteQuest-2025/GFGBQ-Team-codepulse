import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { investmentService } from '../services/investmentService';
import { transactionService } from '../services/transactionService';
import { storage, STORAGE_KEYS } from '../utils/storage';
import { useApp } from './AppContext';

const InvestmentContext = createContext();

/**
 * Investment Context Provider
 * Manages portfolio, investments, and transactions
 */
export const InvestmentProvider = ({ children }) => {
  const { user } = useApp();
  const [portfolio, setPortfolio] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [investmentOptions, setInvestmentOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Namespace storage keys by user so each user sees only their own data
  const userScopedKeys = useMemo(() => {
    const id = user?._id || 'guest';
    return {
      portfolioKey: `${STORAGE_KEYS.PORTFOLIO}_${id}`,
      transactionsKey: `${STORAGE_KEYS.TRANSACTIONS}_${id}`,
    };
  }, [user?._id]);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, [userScopedKeys]);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      // Load from storage first (for offline support)
      const savedPortfolio = storage.get(userScopedKeys.portfolioKey, []);
      const savedTransactions = storage.get(userScopedKeys.transactionsKey, []);
      
      setPortfolio(savedPortfolio);
      setTransactions(savedTransactions);

      // Load investment options
      const options = await investmentService.getInvestmentOptions();
      setInvestmentOptions(options);
    } catch (error) {
      console.error('Error loading investment data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Create new investment
  const createInvestment = async (investmentData) => {
    try {
      const newInvestment = {
        id: Date.now(),
        ...investmentData,
        startDate: new Date().toISOString(),
        currentValue: investmentData.amount,
        status: 'active'
      };

      const updatedPortfolio = [...portfolio, newInvestment];
      setPortfolio(updatedPortfolio);
      storage.set(userScopedKeys.portfolioKey, updatedPortfolio);

      // Create transaction record
      await addTransaction({
        type: 'credit',
        amount: investmentData.amount,
        investmentId: newInvestment.id,
        investmentName: investmentData.name,
        description: `Investment in ${investmentData.name}`
      });

      return newInvestment;
    } catch (error) {
      console.error('Error creating investment:', error);
      throw error;
    }
  };

  // Add transaction
  const addTransaction = async (transactionData) => {
    try {
      const newTransaction = {
        id: Date.now(),
        ...transactionData,
        date: new Date().toISOString(),
        status: 'completed'
      };

      const updatedTransactions = [newTransaction, ...transactions];
      setTransactions(updatedTransactions);
      storage.set(userScopedKeys.transactionsKey, updatedTransactions);

      return newTransaction;
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  };

  // Get portfolio summary
  const getPortfolioSummary = () => {
    const totalInvested = portfolio.reduce((sum, inv) => sum + inv.amount, 0);
    const totalCurrent = portfolio.reduce((sum, inv) => sum + inv.currentValue, 0);
    const totalGain = totalCurrent - totalInvested;
    const gainPercentage = totalInvested > 0 ? ((totalGain / totalInvested) * 100).toFixed(2) : 0;

    return {
      totalInvested,
      totalCurrent,
      totalGain,
      gainPercentage,
      investmentCount: portfolio.length
    };
  };

  // Update investment value (can be called periodically)
  const updateInvestmentValues = () => {
    const updatedPortfolio = portfolio.map(investment => {
      // Calculate compound interest based on actual days elapsed
      const daysSinceStart = Math.floor(
        (Date.now() - new Date(investment.startDate).getTime()) / (1000 * 60 * 60 * 24)
      );
      
      // Compound interest formula: A = P(1 + r/100)^t
      // where t is time in years (daysSinceStart / 365)
      const yearsFraction = daysSinceStart / 365;
      const currentValue = investment.amount * Math.pow(1 + investment.returns / 100, yearsFraction);
      
      return {
        ...investment,
        currentValue: Math.round(currentValue * 100) / 100
      };
    });

    setPortfolio(updatedPortfolio);
    storage.set(userScopedKeys.portfolioKey, updatedPortfolio);
  };

  const value = {
    portfolio,
    transactions,
    investmentOptions,
    isLoading,
    createInvestment,
    addTransaction,
    getPortfolioSummary,
    updateInvestmentValues,
    refreshData: loadInitialData
  };

  return (
    <InvestmentContext.Provider value={value}>
      {children}
    </InvestmentContext.Provider>
  );
};

export const useInvestment = () => {
  const context = useContext(InvestmentContext);
  if (!context) {
    throw new Error('useInvestment must be used within InvestmentProvider');
  }
  return context;
};
