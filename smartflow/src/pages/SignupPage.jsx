import React from 'react';
import { SignupForm } from '../components/auth/SignupForm';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const SignupPage = () => {
  const { currentUser } = useAuth();

  // If already logged in, redirect to dashboard
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <h1>Join FlowPilot</h1>
        <p>Start building smart workflows today</p>
      </div>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
