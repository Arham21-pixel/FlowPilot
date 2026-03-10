import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { 
  LogOut, 
  Search, 
  Bell, 
  Plus, 
  LayoutGrid, 
  BarChart3, 
  Settings, 
  Sparkles,
  Hexagon
} from 'lucide-react';
import { GravityButton } from '../components/ui/GravityButton';
import { GradientButton } from '../components/ui/gradient-button';

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

  // Get initial for avatar
  const userInitial = currentUser.email ? currentUser.email[0].toUpperCase() : 'U';

  return (
    <div className="app-shell">
      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" />
              <path d="M2 17L12 22L22 17" />
              <path d="M2 12L12 17L22 12" />
            </svg>
          </div>
          <span style={{ letterSpacing: '-0.02em' }}>FlowPilot</span>
        </div>

        <nav className="sidebar-nav">
          <a href="/dashboard" className="nav-item active">
            <LayoutGrid size={20} strokeWidth={2.5} />
            <span>Dashboard</span>
            <div className="nav-indicator" />
          </a>
          <a href="/runs" className="nav-item">
            <BarChart3 size={20} strokeWidth={2.5} />
            <span>Analytics</span>
          </a>
          <a href="/builder" className="nav-item">
            <LayoutGrid size={20} strokeWidth={2.5} />
            <span>Workflows</span>
          </a>
          <a href="/settings" className="nav-item">
            <Settings size={20} strokeWidth={2.5} />
            <span>Settings</span>
          </a>
        </nav>

        <div className="sidebar-footer">
          <div className="plan-card">
            <small>Current Plan</small>
            <h4>Enterprise Pro</h4>
            <button className="btn-upgrade">Upgrade</button>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="main-content">
        {/* Topbar */}
        <header className="top-bar">
          <div className="search-wrap">
            <Search size={18} color="#9CA3AF" />
            <input type="text" placeholder="Search workflows, logs, or settings..." />
          </div>

          <div className="user-nav">
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <Bell size={20} color="#6B7280" />
              <div style={{ 
                position: 'absolute', 
                top: -1, right: -1, 
                width: 6, height: 6, 
                backgroundColor: '#EF4444', 
                borderRadius: '50%',
                border: '1.5px solid white' 
              }} />
            </div>

            <div className="user-profile">
              <div className="user-info">
                <span>Riana Vu</span>
                <small>Admin Account</small>
              </div>
              <div className="avatar" style={{ 
                width: 38, height: 38, 
                backgroundColor: '#F3F4F6', 
                borderRadius: '12px', /* Squircle avatar */
                border: '1px solid #E5E7EB',
                overflow: 'hidden'
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
                  alt="Profile" 
                  style={{ width: '100%', height: '100%', objectFit: 'crop' }}
                />
              </div>
            </div>
            
            <button onClick={handleLogout} className="btn-outline" style={{ border: 'none', padding: '0.4rem', background: 'transparent' }}>
              <LogOut size={18} color="#6B7280" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div style={{ padding: '2.5rem 3rem', flexGrow: 1 }}>
          <div className="workflows-title">
            <div>
              <h1>Workflows</h1>
              <p className="text-secondary" style={{ marginTop: '0.25rem', fontSize: '0.95rem', fontWeight: 500 }}>
                You have 0 active automations running.
              </p>
            </div>
            <a href="/builder" className="btn-primary" style={{ padding: '0.75rem 1.25rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={18} strokeWidth={3} />
              <span>New Workflow</span>
            </a>
          </div>

          {/* Workflow Placeholder/Skeletons */}
          <div className="dashboard-grid">
            {[1, 2, 3].map(i => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-circle" />
                <div className="skeleton-line" />
                <div className="skeleton-line mid" />
                <div className="mt-auto">
                  <div className="skeleton-line short" />
                </div>
              </div>
            ))}
          </div>

          {/* Experimental Section */}
          <section className="antigravity-section" style={{ marginTop: '4rem' }}>
            <div className="star-field" />
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div className="flex-align-center justify-center gap-md" style={{ justifyContent: 'center', marginBottom: '0.5rem' }}>
                <Sparkles className="text-secondary" size={20} />
                <h3 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem', color: '#8A8A8A' }}>Experimental</h3>
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Antigravity Engine</h2>
              <p className="text-secondary" style={{ maxWidth: '400px', margin: '0.5rem auto' }}>
                Test our experimental levitation UI component below.
              </p>
            </div>

            <GravityButton>Launch Session</GravityButton>
          </section>

          {/* New Gradient Showcase Section */}
          <section className="mt-12 p-10 bg-white rounded-[24px] border border-gray-100 shadow-sm">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">Interactive UI Elements</h2>
              <p className="text-gray-500 mt-2">New high-fidelity gradient buttons for primary actions.</p>
            </div>
            
            <div className="flex flex-wrap gap-8 items-center bg-gray-50/50 p-8 rounded-2xl border border-dashed border-gray-200">
              <div className="flex flex-col gap-3">
                <span className="text-[0.7rem] uppercase tracking-wider font-bold text-gray-400">Default Variant</span>
                <GradientButton>Get Started</GradientButton>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-[0.7rem] uppercase tracking-wider font-bold text-gray-400">Cosmic Variant</span>
                <GradientButton variant="variant">Explore More</GradientButton>
              </div>
              
              <div className="ml-auto p-4 bg-white/80 backdrop-blur rounded-xl border border-gray-100 max-w-[200px]">
                <p className="text-[0.75rem] text-gray-500 leading-relaxed italic">
                  "These animated surfaces use CSS @property for smooth, hardware-accelerated transitions."
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
