import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { useAuth } from './hooks/useAuth'

// Import Pages
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import './index.css'

function App() {
  const { loading } = useAuth();

  // If Firebase is still verifying the user session on load, we render nothing (or a spinner)
  if (loading) {
    return (
      <div className="auth-page">
        <div style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>Loading FlowPilot...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="app-container">
        <main className="main-content" style={{ padding: 0, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            {/* Public Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            
            <Route path="/builder" element={
              <ProtectedRoute>
                <div style={{ padding: '2rem' }}>Builder Canvas Goes Here</div>
              </ProtectedRoute>
            } />
            
            <Route path="/runs" element={
              <ProtectedRoute>
                <div style={{ padding: '2rem' }}>Workflow Runs Go Here</div>
              </ProtectedRoute>
            } />

            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
