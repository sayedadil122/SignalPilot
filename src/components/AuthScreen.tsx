import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';

type AuthMode = 'login' | 'signup';

export const AuthScreen: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isSignup = mode === 'signup';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setSubmitting(true);

    const normalizedEmail = email.trim().toLowerCase();

    try {
      if (isSignup) {
        const { error: signUpError } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: {
            data: {
              full_name: fullName.trim(),
            },
          },
        });

        if (signUpError) throw signUpError;
        setMessage('Account created. Logging you in...');
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });

        if (signInError) throw signInError;
      }
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : 'Authentication failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-shell">
      <section className="auth-hero">
        <div className="auth-brand">
          <div className="auth-logo">SP</div>
          <span>SignalPilot</span>
        </div>
        <h1>Customer signal intelligence for faster product decisions</h1>
        <p>
          Turn reviews, support notes, and competitor complaints into problem themes, opportunity scores,
          and evidence packs your team can act on.
        </p>
        <div className="auth-proof-grid" aria-label="SignalPilot highlights">
          <div>
            <strong>8+</strong>
            <span>Review sources</span>
          </div>
          <div>
            <strong>AI</strong>
            <span>Theme clustering</span>
          </div>
          <div>
            <strong>Live</strong>
            <span>Saved dashboards</span>
          </div>
        </div>
      </section>

      <section className="auth-panel" aria-label={isSignup ? 'Create account' : 'Log in'}>
        <div className="auth-panel-header">
          <div className="auth-panel-icon">
            <Zap size={18} />
          </div>
          <div>
            <h2>{isSignup ? 'Create your workspace' : 'Welcome back'}</h2>
            <p>{isSignup ? 'Start tracking customer pain in minutes.' : 'Log in to open your dashboard.'}</p>
          </div>
        </div>

        <div className="auth-tabs">
          <button className={mode === 'login' ? 'active' : ''} type="button" onClick={() => setMode('login')}>
            Login
          </button>
          <button className={mode === 'signup' ? 'active' : ''} type="button" onClick={() => setMode('signup')}>
            Sign up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isSignup && (
            <label className="auth-field">
              <span>Full name</span>
              <div className="auth-input-wrap">
                <User size={18} />
                <input
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Adil Khan"
                  autoComplete="name"
                />
              </div>
            </label>
          )}

          <label className="auth-field">
            <span>Email</span>
            <div className="auth-input-wrap">
              <Mail size={18} />
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                required
              />
            </div>
          </label>

          <label className="auth-field">
            <span>Password</span>
            <div className="auth-input-wrap">
              <Lock size={18} />
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type={showPassword ? 'text' : 'password'}
                placeholder="Minimum 6 characters"
                autoComplete={isSignup ? 'new-password' : 'current-password'}
                minLength={6}
                required
              />
              <button
                className="auth-icon-button"
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </label>

          {error && <div className="auth-alert error">{error}</div>}
          {message && <div className="auth-alert success">{message}</div>}

          <button className="auth-submit" type="submit" disabled={submitting}>
            {submitting ? 'Please wait...' : isSignup ? 'Create account' : 'Login'}
          </button>
        </form>
      </section>
    </main>
  );
};
