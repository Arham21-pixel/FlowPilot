import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, AlertCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { CardStack } from '../components/ui/card-stack';

const SHOWCASE_ITEMS = [
  {
    id: 1,
    title: "Automate Any Workflow",
    description: "Build complex multi-step automations with a simple drag-and-drop canvas.",
    imageSrc: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
    tag: "Builder",
  },
  {
    id: 2,
    title: "Connect Your Tools",
    description: "Integrate with hundreds of apps — Slack, GitHub, Notion and more.",
    imageSrc: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    tag: "Integrations",
  },
  {
    id: 3,
    title: "Monitor in Real-Time",
    description: "Track every workflow run with detailed logs and instant alerts.",
    imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    tag: "Analytics",
  },
  {
    id: 4,
    title: "Collaborate at Scale",
    description: "Share workflows with your team and manage permissions effortlessly.",
    imageSrc: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    tag: "Teams",
  },
  {
    id: 5,
    title: "Ship Faster, Always",
    description: "From idea to live automation in minutes — not days.",
    imageSrc: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
    tag: "Productivity",
  },
];

export default function LoginPage() {
  const { currentUser, login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  if (currentUser) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
    } catch (err) {
      setError('Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="auth-split-page">
      {/* Decorative Blobs */}
      <div className="auth-bg-blob blob-1"></div>
      <div className="auth-bg-blob blob-2"></div>

      {/* ── Left panel: CardStack showcase ── */}
      <motion.div 
        className="auth-split-left"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="auth-split-brand">
          <Zap size={28} strokeWidth={2.5} />
          <span>FlowPilot</span>
        </div>

        <div className="auth-split-showcase">
          <CardStack
            items={SHOWCASE_ITEMS}
            cardWidth={420}
            cardHeight={270}
            autoAdvance
            intervalMs={2800}
            pauseOnHover
            showDots
            overlap={0.42}
            spreadDeg={40}
            maxVisible={5}
          />
        </div>

        <div className="auth-split-tagline">
          <h2>Automate the future,<br />today.</h2>
          <p>FlowPilot puts powerful workflow automation in everyone's hands.</p>
        </div>
      </motion.div>

      {/* ── Right panel: Login form ── */}
      <div className="auth-split-right">
        <motion.div 
          className="auth-split-form-wrap"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="auth-split-header">
            <h1>Welcome back</h1>
            <p>Sign in to your FlowPilot account</p>
          </motion.div>

          {error && (
            <motion.div variants={itemVariants} className="auth-alert auth-alert--error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="auth-split-form">
            <motion.div variants={itemVariants} className="auth-field">
              <label htmlFor="login-email">Email address</label>
              <div className="auth-input-wrap">
                <Mail size={16} className="auth-input-icon" />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="auth-field">
              <label htmlFor="login-password">Password</label>
              <div className="auth-input-wrap">
                <Lock size={16} className="auth-input-icon" />
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="auth-input-toggle"
                  onClick={() => setShowPass((v) => !v)}
                  tabIndex={-1}
                >
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </div>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="auth-btn-primary"
              disabled={loading}
            >
              {loading ? (
                <span className="auth-spinner" />
              ) : (
                <>
                  <LogIn size={17} />
                  Sign in
                </>
              )}
            </motion.button>
          </form>

          <motion.div variants={itemVariants} className="auth-divider-split">
            <span>or continue with</span>
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            className="auth-btn-google"
            onClick={handleGoogle}
            disabled={loading}
          >
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </motion.button>

          <motion.p variants={itemVariants} className="auth-footer-text">
            Don't have an account?{' '}
            <Link to="/signup">Create one for free</Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

function friendlyError(code) {
  switch (code) {
    case 'auth/invalid-email': return 'Please enter a valid email address.';
    case 'auth/user-not-found': return 'No account found with this email.';
    case 'auth/wrong-password':
    case 'auth/invalid-credential': return 'Incorrect email or password.';
    case 'auth/too-many-requests': return 'Too many attempts. Please try again later.';
    default: return 'Sign-in failed. Please try again.';
  }
}
