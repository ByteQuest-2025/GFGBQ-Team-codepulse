import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { investmentService } from '../services/investmentService';
import { transactionService } from '../services/transactionService';
import { storage, STORAGE_KEYS } from '../utils/storage';
import { useApp } from './AppContext';

const InvestmentContext = createContext();

// Demo helper: ensure we accrue at least this many days per tick so UI shows growth quickly
const DEMO_MIN_DAYS_PER_TICK = 1; // 1 day of interest each accrual pass

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

  const accrueReturns = useCallback((portfolioSnapshot = portfolio, transactionsSnapshot = transactions, persist = true) => {
    const now = Date.now();
    let portfolioChanged = false;
    let transactionsChanged = false;

    const updatedPortfolio = portfolioSnapshot.map((investment) => {
      const rate = investment.returns ?? 0;
      if (rate <= 0 || investment.status !== 'active') return investment;

      const lastAccrued = new Date(investment.lastAccrued || investment.startDate).getTime();
      const elapsedDays = (now - lastAccrued) / (1000 * 60 * 60 * 24);
      // Simulate minimum elapsed time so demo users see growth quickly
      const effectiveDays = Math.max(elapsedDays, DEMO_MIN_DAYS_PER_TICK);
      if (effectiveDays <= 0) return investment;

      const interest = investment.currentValue * (rate / 100) * (effectiveDays / 365);
      if (interest <= 0) return investment;

      portfolioChanged = true;

      const updatedInvestment = {
        ...investment,
        currentValue: Math.round((investment.currentValue + interest) * 100) / 100,
        lastAccrued: new Date(now).toISOString(),
      };

      // Record an interest transaction if meaningful (> ₹0.01)
      if (interest > 0.01) {
        const interestTxn = {
          id: `${updatedInvestment.id}_interest_${Math.floor(now)}`,
          type: 'interest',
          amount: Math.round(interest * 100) / 100,
          investmentId: updatedInvestment.id,
          investmentName: updatedInvestment.name,
          date: new Date(now).toISOString(),
          status: 'completed',
          title: 'Interest credited',
          investment: updatedInvestment.name,
        };
        transactionsSnapshot = [interestTxn, ...transactionsSnapshot];
        transactionsChanged = true;
      }

      return updatedInvestment;
    });

    if (portfolioChanged && persist) {
      setPortfolio(updatedPortfolio);
      storage.set(userScopedKeys.portfolioKey, updatedPortfolio);
    }

    if (transactionsChanged && persist) {
      setTransactions(transactionsSnapshot);
      storage.set(userScopedKeys.transactionsKey, transactionsSnapshot);
    }

    // When not persisting (initial load), update state and storage once
    if (persist === false && (portfolioChanged || transactionsChanged)) {
      setPortfolio(updatedPortfolio);
      storage.set(userScopedKeys.portfolioKey, updatedPortfolio);
      setTransactions(transactionsSnapshot);
      storage.set(userScopedKeys.transactionsKey, transactionsSnapshot);
    }

    return { updatedPortfolio, transactionsSnapshot };
  }, [portfolio, transactions, userScopedKeys.portfolioKey, userScopedKeys.transactionsKey]);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, [userScopedKeys]);

  // Keep accruing returns periodically across the app (not just on Passbook page)
  useEffect(() => {
    const id = setInterval(() => accrueReturns(), 10000); // every 10s
    return () => clearInterval(id);
  }, [accrueReturns]);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      // Load from storage first (for offline support)
      const savedPortfolio = storage.get(userScopedKeys.portfolioKey, []);
      const savedTransactions = storage.get(userScopedKeys.transactionsKey, []);
      
      setPortfolio(savedPortfolio);
      setTransactions(savedTransactions);

      // Accrue returns on load so UI shows up-to-date growth
      accrueReturns(savedPortfolio, savedTransactions, false);

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
        lastAccrued: new Date().toISOString(),
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
        // Ensure UI-friendly labels
        investment: transactionData.investmentName || transactionData.investment || transactionData.description || 'Investment',
        title: transactionData.title || transactionData.investmentName || transactionData.description || 'Transaction',
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
    accrueReturns();
  };

  // Withdraw from a specific investment (client-side simulation)
  const withdrawFromInvestment = async (investmentId, amount) => {
    if (!amount || amount <= 0) {
      throw new Error('Withdrawal amount must be positive');
    }

    const investment = portfolio.find((inv) => inv.id === investmentId);
    if (!investment) {
      throw new Error('Investment not found');
    }
    if (investment.currentValue < amount) {
      throw new Error('Insufficient funds in this investment');
    }

    const updatedInvestment = {
      ...investment,
      currentValue: Math.round((investment.currentValue - amount) * 100) / 100,
      amount: Math.round((investment.amount - amount) * 100) / 100,
    };

    const updatedPortfolio = portfolio.map((inv) => (inv.id === investmentId ? updatedInvestment : inv));
    setPortfolio(updatedPortfolio);
    storage.set(userScopedKeys.portfolioKey, updatedPortfolio);

    await addTransaction({
      type: 'debit',
      amount,
      investmentId,
      investmentName: investment.name,
      description: `Withdrawal from ${investment.name}`,
      title: 'Withdrawal',
    });

    return updatedInvestment;
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
    withdrawFromInvestment,
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
