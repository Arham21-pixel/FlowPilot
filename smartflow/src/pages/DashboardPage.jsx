import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { LogOut, Home, Play, PenTool } from 'lucide-react';

export const DashboardPage = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="flex-align-center gap-md">
          <div className="avatar">
            {currentUser.email ? currentUser.email[0].toUpperCase() : 'U'}
          </div>
          <div>
            <h2>Dashboard</h2>
            <p className="text-muted">Welcome back, {currentUser.email}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="btn-outline">
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </header>

      <div className="dashboard-grid">
        <div className="dashboard-card action-card">
          <div className="card-icon blue"><PenTool size={32} /></div>
          <h3>Builder</h3>
          <p>Create and edit your automated workflows with our drag-and-drop canvas.</p>
          <a href="/builder" className="btn-primary mt-auto">Go to Builder</a>
        </div>
        
        <div className="dashboard-card action-card">
          <div className="card-icon green"><Play size={32} /></div>
          <h3>Recent Runs</h3>
          <p>View the history and logs of your latest automated tasks.</p>
          <a href="/runs" className="btn-secondary mt-auto">View Runs</a>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
