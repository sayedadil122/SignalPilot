import React, { useState } from 'react';
import { BarChart3, Eye, EyeOff, FileText, Lock, Mail, ShieldAlert, User } from 'lucide-react';
import { supabase } from '../lib/supabase';

type AuthMode = 'login' | 'signup';

interface AuthScreenProps {
  initialMode?: AuthMode;
  compact?: boolean;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ initialMode = 'login', compact = false }) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
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
        setMessage('Account created. Opening your workspace...');
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

  const authPanel = (
    <section className="auth-panel" aria-label={isSignup ? 'Create account' : 'Log in'}>
      <div className="auth-panel-header">
        <div>
          <h2>{isSignup ? 'Create your workspace' : 'Welcome back'}</h2>
          <p>{isSignup ? 'Start a product intelligence workspace.' : 'Log in to continue your analysis.'}</p>
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
  );

  if (compact) {
    return authPanel;
  }

  return (
    <main className="auth-shell">
      <section className="auth-hero">
        <div className="auth-brand">
          <div className="auth-logo">SP</div>
          <span>SignalPilot</span>
        </div>

        <div className="auth-copy">
          <span className="eyebrow">Product Discovery Intelligence</span>
          <h1>Turn noisy feedback into confident product decisions</h1>
          <p>
            Analyze reviews, support tickets, competitor complaints, and market signals to find evidence
            quality, bias risk, and validation-ready product opportunities.
          </p>
        </div>

        <div className="auth-proof-grid" aria-label="SignalPilot highlights">
          <div>
            <FileText size={18} />
            <strong>8+ Review Sources</strong>
            <span>Public and internal signal intake.</span>
          </div>
          <div>
            <ShieldAlert size={18} />
            <strong>Bias Risk Detection</strong>
            <span>Separate signal from loud segments.</span>
          </div>
          <div>
            <BarChart3 size={18} />
            <strong>Evidence Packs</strong>
            <span>Decision-ready PM artifacts.</span>
          </div>
        </div>

        <div className="auth-preview" aria-hidden="true">
          <div className="auth-preview-header">
            <span>Decision review</span>
            <strong>84% confidence</strong>
          </div>
          <div className="auth-preview-row">
            <span>Evidence strength</span>
            <div><i style={{ width: '82%' }} /></div>
          </div>
          <div className="auth-preview-row">
            <span>Bias risk</span>
            <div><i className="amber" style={{ width: '38%' }} /></div>
          </div>
          <div className="auth-preview-note">Recommended next action: validate with enterprise accounts.</div>
        </div>
      </section>

      {authPanel}
    </main>
  );
};
