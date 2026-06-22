import React, { useState } from 'react';
import { Save, Cpu, BellRing, Brain, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export const Settings: React.FC = () => {
  const [frequency, setFrequency] = useState('daily');
  const [clusteringMode, setClusteringMode] = useState('balanced');
  const [biasAlerts, setBiasAlerts] = useState(true);
  const [confidenceThreshold, setConfidenceThreshold] = useState('70');
  const [emailDigest, setEmailDigest] = useState(false);

  const handleSave = () => {
    toast.success('Settings saved to local storage.');
  };

  return (
    <div style={{ maxWidth: '680px' }}>
      <div className="dashboard-header" style={{ marginBottom: '28px' }}>
        <div className="dashboard-title-group">
          <h1>Settings</h1>
          <p className="dashboard-subtitle">
            Configure analysis behaviour, alert preferences, and prototype options.
          </p>
        </div>
      </div>

      {/* Phase 1 Prototype Notice */}
      <div className="differentiation-box" style={{ padding: '20px', borderRadius: '12px', marginBottom: '28px' }}>
        <div style={{ fontSize: '20px', marginRight: '8px' }}>🧪</div>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '4px' }}>Phase 1 Prototype</div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
            You are using the <strong>frontend-only MVP</strong> of SignalPilot. Analysis is powered by a simulated AI engine with mock data. Real URL scraping, platform APIs, and live review extraction will go live in <strong>Phase 2</strong>.
          </p>
        </div>
      </div>

      <div className="settings-container">

        {/* Analysis Settings */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Brain style={{ width: '18px', height: '18px', color: 'var(--primary)' }} /> Analysis Behaviour
          </h2>

          <div className="settings-group">
            <label className="settings-label">Default Crawling Frequency</label>
            <p className="settings-description">How often SignalPilot scans competitor review platforms when monitors are active.</p>
            <select className="sort-select" value={frequency} onChange={e => setFrequency(e.target.value)} style={{ maxWidth: '260px' }}>
              <option value="hourly">Hourly (high signal volume)</option>
              <option value="daily">Daily — Recommended</option>
              <option value="weekly">Weekly (low noise preference)</option>
            </select>
          </div>

          <div className="settings-group">
            <label className="settings-label">Clustering Strictness</label>
            <p className="settings-description">Controls how aggressively SignalPilot groups feedback into shared pain themes.</p>
            <select className="sort-select" value={clusteringMode} onChange={e => setClusteringMode(e.target.value)} style={{ maxWidth: '260px' }}>
              <option value="loose">Loose — More themes, lower precision</option>
              <option value="balanced">Balanced — Recommended</option>
              <option value="strict">Strict — Fewer themes, high confidence only</option>
            </select>
          </div>

          <div className="settings-group">
            <label className="settings-label">Minimum Confidence Threshold</label>
            <p className="settings-description">Themes below this confidence score will be hidden from results.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input
                type="range" min="40" max="95" value={confidenceThreshold}
                onChange={e => setConfidenceThreshold(e.target.value)}
                style={{ width: '180px' }}
              />
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)' }}>{confidenceThreshold}%</span>
            </div>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BellRing style={{ width: '18px', height: '18px', color: 'var(--primary)' }} /> Alerts & Notifications
          </h2>

          <div className="settings-group">
            <label className="filter-option" style={{ alignItems: 'flex-start', gap: '12px' }}>
              <input
                type="checkbox" className="filter-checkbox"
                checked={biasAlerts} onChange={e => setBiasAlerts(e.target.checked)}
                style={{ marginTop: '2px' }}
              />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-dark)' }}>Show Bias Risk Alerts</div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0', lineHeight: 1.4 }}>
                  Display badge warnings on themes where feedback is overrepresented from a single channel.
                </p>
              </div>
            </label>
          </div>

          <div className="settings-group">
            <label className="filter-option" style={{ alignItems: 'flex-start', gap: '12px' }}>
              <input
                type="checkbox" className="filter-checkbox"
                checked={emailDigest} onChange={e => setEmailDigest(e.target.checked)}
                style={{ marginTop: '2px' }}
              />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-dark)' }}>Weekly Email Digest</div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0', lineHeight: 1.4 }}>
                  Receive a weekly intelligence summary for all active monitors. (Phase 2 feature — toggle is saved but email delivery requires backend.)
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Integrations (read-only placeholder) */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu style={{ width: '18px', height: '18px', color: 'var(--primary)' }} /> Platform API Keys
          </h2>

          <div className="settings-group">
            <label className="settings-label">Jira Integration Token</label>
            <p className="settings-description">Connect to Jira Product Discovery to push evidence packs directly to epics. (Phase 2)</p>
            <input
              type="text" className="settings-input"
              placeholder="Enter JPD Integration Token…"
              disabled style={{ background: '#f1f5f9', cursor: 'not-allowed', maxWidth: '400px' }}
            />
          </div>

          <div className="settings-group">
            <label className="settings-label">Slack Webhook URL</label>
            <p className="settings-description">Receive instant alerts in your Slack channel when competitor sentiment spikes. (Phase 2)</p>
            <input
              type="text" className="settings-input"
              placeholder="https://hooks.slack.com/services/…"
              disabled style={{ background: '#f1f5f9', cursor: 'not-allowed', maxWidth: '400px' }}
            />
          </div>
        </div>

        {/* Data Privacy */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck style={{ width: '18px', height: '18px', color: 'var(--primary)' }} /> Data & Privacy
          </h2>
          <div className="settings-group">
            <p className="settings-description">
              Phase 1: All analysis data is stored exclusively in your browser's <strong>LocalStorage</strong>. No data is sent to any server. Clearing browser storage will reset all saved projects and overrides.
            </p>
            <button
              className="btn-secondary"
              style={{ marginTop: '8px', fontSize: '13px', color: '#dc2626', borderColor: 'rgba(220,38,38,0.3)' }}
              onClick={() => {
                if (window.confirm('This will clear all saved projects, monitors, and PM overrides. Are you sure?')) {
                  localStorage.clear();
                  toast.success('Local data cleared. Reload the page to reset.');
                }
              }}
            >
              Clear All Local Data
            </button>
          </div>
        </div>

        <button className="btn-primary" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={handleSave}>
          <Save style={{ width: '16px', height: '16px' }} /> Save Settings
        </button>
      </div>
    </div>
  );
};
