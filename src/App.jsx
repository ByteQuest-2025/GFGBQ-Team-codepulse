import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { InvestmentProvider } from './context/InvestmentContext';
import { EducationProvider } from './context/EducationContext';

// Pages
import OnboardingPage from './pages/OnboardingPage';
import HomePage from './pages/HomePage';
import InvestPage from './pages/InvestPage';
import LearnPage from './pages/LearnPage';
import PassbookPage from './pages/PassbookPage';
import ProfilePage from './pages/ProfilePage';

// Loading Component
import LoadingSpinner from './components/common/LoadingSpinner';

import './App.css';

/**
 * Protected Route Component
 */
const ProtectedRoute = ({ children }) => {
  const { isOnboardingComplete, isLoading } = useApp();

  if (isLoading) {
    return <LoadingSpinner message="Loading..." />;
  }

  return isOnboardingComplete ? children : <Navigate to="/onboarding" />;
};

/**
 * Main App Router
 */
function AppRouter() {
  const { isOnboardingComplete, completeOnboarding, updateLanguage } = useApp();

  const handleOnboardingComplete = (selectedLanguage) => {
    updateLanguage(selectedLanguage);
    completeOnboarding();
  };

  return (
    <Router>
      <Routes>
        {/* Onboarding Route */}
        <Route
          path="/onboarding"
          element={
            isOnboardingComplete ? (
              <Navigate to="/" />
            ) : (
              <OnboardingPage onComplete={handleOnboardingComplete} />
            )
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invest"
          element={
            <ProtectedRoute>
              <InvestPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learn"
          element={
            <ProtectedRoute>
              <LearnPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/passbook"
          element={
            <ProtectedRoute>
              <PassbookPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

/**
 * Main App Component
 */
function App() {
  return (
    <AppProvider>
      <InvestmentProvider>
        <EducationProvider>
          <AppRouter />
        </EducationProvider>
      </InvestmentProvider>
    </AppProvider>
  );
}

export default App;
