import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, AlertCircle, CheckCircle2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { CardStack } from '../components/ui/card-stack';

const SHOWCASE_ITEMS = [
  {
    id: 1,
    title: "Start in Minutes",
    description: "Go from sign-up to your first live workflow in under 5 minutes.",
    imageSrc: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    tag: "Quick Start",
  },
  {
    id: 2,
    title: "No Code Required",
    description: "Build powerful automations visually — no programming knowledge needed.",
    imageSrc: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    tag: "No-Code",
  },
  {
    id: 3,
    title: "Unlimited Workflows",
    description: "Create as many automated workflows as your team needs.",
    imageSrc: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    tag: "Scalable",
  },
  {
    id: 4,
    title: "Enterprise-Grade Security",
    description: "Your data is encrypted end-to-end and stored securely in the cloud.",
    imageSrc: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    tag: "Security",
  },
  {
    id: 5,
    title: "24/7 Reliability",
    description: "99.9% uptime SLA so your workflows never miss a beat.",
    imageSrc: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80",
    tag: "Reliability",
  },
];

const PASSWORD_CHECKS = [
  { label: 'At least 6 characters', test: (p) => p.length >= 6 },
  { label: 'Contains a number', test: (p) => /\d/.test(p) },
];

export default function SignupPage() {
  const { currentUser, signup, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  if (currentUser) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    try {
      setError('');
      setLoading(true);
      await signup(email, password);
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
      setError('Google sign-up failed. Please try again.');
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
            intervalMs={3000}
            pauseOnHover
            showDots
            overlap={0.42}
            spreadDeg={40}
            maxVisible={5}
          />
        </div>

        <div className="auth-split-tagline">
          <h2>Join 10,000+ teams<br />automating smarter.</h2>
          <p>Free to start. No credit card required.</p>
        </div>
      </motion.div>

      {/* ── Right panel: Signup form ── */}
      <div className="auth-split-right">
        <motion.div 
          className="auth-split-form-wrap"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="auth-split-header">
            <h1>Create your account</h1>
            <p>Start automating for free today</p>
          </motion.div>

          {error && (
            <motion.div variants={itemVariants} className="auth-alert auth-alert--error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="auth-split-form">
            <motion.div variants={itemVariants} className="auth-field">
              <label htmlFor="signup-email">Email address</label>
              <div className="auth-input-wrap">
                <Mail size={16} className="auth-input-icon" />
                <input
                  id="signup-email"
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
              <label htmlFor="signup-password">Password</label>
              <div className="auth-input-wrap">
                <Lock size={16} className="auth-input-icon" />
                <input
                  id="signup-password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
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
              {/* Password strength hints */}
              {password.length > 0 && (
                <div className="auth-pwd-hints">
                  {PASSWORD_CHECKS.map((check) => (
                    <motion.div
                      key={check.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={['auth-pwd-hint', check.test(password) ? 'auth-pwd-hint--ok' : ''].join(' ')}
                    >
                      <CheckCircle2 size={12} />
                      <span>{check.label}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="auth-field">
              <label htmlFor="signup-confirm">Confirm password</label>
              <div className="auth-input-wrap">
                <Lock size={16} className="auth-input-icon" />
                <input
                  id="signup-confirm"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  minLength={6}
                />
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
                  <UserPlus size={17} />
                  Create account
                </>
              )}
            </motion.button>
          </form>

          <motion.div variants={itemVariants} className="auth-divider-split">
            <span>or sign up with</span>
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
            Already have an account?{' '}
            <Link to="/login">Sign in instead</Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

function friendlyError(code) {
  switch (code) {
    case 'auth/email-already-in-use': return 'This email is already registered. Try signing in.';
    case 'auth/invalid-email': return 'Please enter a valid email address.';
    case 'auth/weak-password': return 'Password should be at least 6 characters.';
    default: return 'Sign-up failed. Please try again.';
  }
}
