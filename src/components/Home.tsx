import React from 'react';
import { Search, Clipboard, Upload, Clock, Play } from 'lucide-react';

interface HomeProps {
  setActiveTab: (tab: string) => void;
  onTrySampleProject: () => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab, onTrySampleProject }) => {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '16px 0' }}>
      {/* Brand Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px', marginTop: '16px' }}>
        <span className="badge badge-primary" style={{ marginBottom: '16px', fontSize: '12px' }}>
          Product Discovery Intelligence Agent
        </span>
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '16px', lineHeight: '1.2' }}>
          Turn messy feedback into roadmap-ready decisions
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
          Analyze competitor reviews, public complaints, and internal feedback to uncover user pain, market gaps, and evidence-backed product opportunities.
        </p>
      </div>

      {/* Main Grid (4 Action Cards) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
      }}>
        {/* Card 1: URL Analyzer */}
        <div className="analyzer-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
          <div>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              backgroundColor: 'rgba(79, 70, 229, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)',
              marginBottom: '16px'
            }}>
              <Search style={{ width: '22px', height: '22px' }} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '8px' }}>
              Analyze by URL
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '20px' }}>
              Import public feedback directly from G2, Capterra, Reddit, App Store, Play Store, or competitor websites.
            </p>
          </div>
          <button className="btn-primary" style={{ width: '100%', padding: '10px', fontSize: '13px' }} onClick={() => setActiveTab('analyzer')}>
            Analyze URL
          </button>
        </div>

        {/* Card 2: Paste Feedback */}
        <div className="analyzer-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
          <div>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              backgroundColor: 'rgba(124, 58, 237, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)',
              marginBottom: '16px'
            }}>
              <Clipboard style={{ width: '22px', height: '22px' }} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '8px' }}>
              Paste Feedback
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '20px' }}>
              Manually paste support tickets, sales call logs, customer surveys, or user interview notes for quick extraction.
            </p>
          </div>
          <button className="btn-primary" style={{ width: '100%', padding: '10px', fontSize: '13px', backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }} onClick={() => setActiveTab('paste')}>
            Paste Feedback
          </button>
        </div>

        {/* Card 3: Upload Reviews / CSV */}
        <div className="analyzer-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
          <div>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              backgroundColor: 'rgba(13, 148, 136, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--teal)',
              marginBottom: '16px'
            }}>
              <Upload style={{ width: '22px', height: '22px' }} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '8px' }}>
              Upload Reviews / CSV
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '20px' }}>
              Upload bulk review exports, Zendesk/Intercom ticket dumps, or survey spreadsheet logs in CSV, JSON, or TXT formats.
            </p>
          </div>
          <button className="btn-primary" style={{ width: '100%', padding: '10px', fontSize: '13px', backgroundColor: 'var(--teal)', borderColor: 'var(--teal)' }} onClick={() => setActiveTab('upload')}>
            Upload File
          </button>
        </div>

        {/* Card 4: Schedule Signal Monitor */}
        <div className="analyzer-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
          <div>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              backgroundColor: 'rgba(217, 119, 6, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--warning)',
              marginBottom: '16px'
            }}>
              <Clock style={{ width: '22px', height: '22px' }} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '8px' }}>
              Schedule Monitor
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '20px' }}>
              Set up automated crawlers to continuously track competitors or review feeds and email you weekly summaries.
            </p>
          </div>
          <button className="btn-primary" style={{ width: '100%', padding: '10px', fontSize: '13px', backgroundColor: 'var(--warning)', borderColor: 'var(--warning)' }} onClick={() => setActiveTab('monitor')}>
            Create Monitor
          </button>
        </div>
      </div>

      {/* Try Sample Section */}
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <button
          onClick={onTrySampleProject}
          className="btn-primary"
          style={{ padding: '12px 24px', fontSize: '14px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <Play style={{ width: '16px', height: '16px', fill: '#fff' }} />
          Try Sample Productboard Analysis
        </button>
      </div>

      {/* Explainer Box */}
      <div className="differentiation-box" style={{ padding: '24px', borderRadius: '12px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div style={{ fontSize: '24px' }}>💡</div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
              Key Differentiation: SignalPilot vs. Traditional Repositories
            </div>
            <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
              Legacy tools require PMs to manually read, tag, and sort thousands of incoming complaints. <strong>SignalPilot does not just store feedback.</strong> It acts as a discovery agent that extracts underlying user problems, quantifies severities, highlights competitor blind spots, and drafts stakeholder-ready evidence packs so you can make confident roadmap decisions instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
