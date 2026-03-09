import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const LoginPage = () => {
  const { currentUser } = useAuth();

  // If already logged in, redirect to dashboard
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <h1>Welcome to FlowPilot</h1>
        <p>Automate your workflows seamlessly</p>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
