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
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LandingPage from './pages/LandingPage';
import TermsPage from './pages/TermsPage';
import SupportPage from './pages/SupportPage';

// Loading Component
import LoadingSpinner from './components/common/LoadingSpinner';

import './App.css';

/**
 * Protected Route Component
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isOnboardingComplete, isLoading, t } = useApp();

  if (isLoading) {
    return <LoadingSpinner message={t('common.loading', 'Loading...')} />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isOnboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

/**
 * Main App Router
 */
function AppRouter() {
  const { isAuthenticated, isOnboardingComplete, completeOnboarding, updateLanguage } = useApp();

  const handleOnboardingComplete = (selectedLanguage) => {
    updateLanguage(selectedLanguage);
    completeOnboarding();
  };

  return (
    <Router>
      <Routes>
        {/* Public landing at root */}
        <Route
          path="/"
          element={
            isAuthenticated
              ? isOnboardingComplete
                ? <Navigate to="/home" replace />
                : <Navigate to="/onboarding" replace />
              : <LandingPage />
          }
        />

        {/* Onboarding Route */}
        <Route
          path="/onboarding"
          element={
            !isAuthenticated ? (
              <Navigate to="/login" replace />
            ) : isOnboardingComplete ? (
              <Navigate to="/home" replace />
            ) : (
              <OnboardingPage onComplete={handleOnboardingComplete} />
            )
          }
        />

        {/* Login Route */}
        <Route
          path="/login"
          element={
            isAuthenticated
              ? isOnboardingComplete
                ? <Navigate to="/home" replace />
                : <Navigate to="/onboarding" replace />
              : <LoginPage />
          }
        />

        {/* Public Landing fallback */}
        <Route path="/landing" element={<LandingPage />} />

        {/* Signup Route */}
        <Route
          path="/signup"
          element={
            isAuthenticated
              ? isOnboardingComplete
                ? <Navigate to="/home" replace />
                : <Navigate to="/onboarding" replace />
              : <SignupPage />
          }
        />

        {/* Protected Routes */}
        <Route
          path="/home"
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

        <Route
          path="/terms"
          element={
            <ProtectedRoute>
              <TermsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/support"
          element={
            <ProtectedRoute>
              <SupportPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
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
