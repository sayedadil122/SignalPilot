import React, { useState } from 'react';
import { Clipboard, FileText } from 'lucide-react';
import type { PlatformType } from '../types';

interface PasteFeedbackProps {
  onAnalyze: (data: string, platform: PlatformType | 'Auto Detect') => void;
}

type FeedbackSourceType = PlatformType | 'Auto Detect' | 'Internal';

export const PasteFeedback: React.FC<PasteFeedbackProps> = ({ onAnalyze }) => {
  const [text, setText] = useState('');
  const [sourceType, setSourceType] = useState<FeedbackSourceType>('Internal');

  const handleUseSample = () => {
    setText(`User 1: The manual tagging process in Productboard is completely broken. I spend 5 hours a week just categorizing things that could be automated.
User 2: Dovetail's search is so slow. I can't find the insights I tagged last week.
User 3: We need a way to connect Jira discovery directly to customer quotes without copy-pasting everything.
User 4: Capterra reviews say we lack a good API. I think we need to prioritize the integrations epic.`);
    setSourceType('Internal');
  };

  const handleAnalyzeClick = () => {
    if (!text.trim()) {
      alert('Please paste some feedback text first.');
      return;
    }
    // Assume Internal or pass as Auto Detect based on logic
    onAnalyze(text, sourceType === 'Internal' ? 'Auto Detect' : sourceType);
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <div className="dashboard-header" style={{ marginBottom: '24px' }}>
        <div className="dashboard-title-group">
          <h1>Paste Feedback</h1>
          <p className="dashboard-subtitle">
            Manually input unstructured feedback text, survey responses, or interview notes for AI analysis.
          </p>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '8px' }}>
            Feedback Source Type
          </label>
          <select 
            value={sourceType} 
            onChange={(e) => setSourceType(e.target.value as FeedbackSourceType)}
            className="sort-select" 
            style={{ width: '100%', maxWidth: '300px' }}
          >
            <option value="Internal">Internal (Sales calls, Support, Slack)</option>
            <option value="Auto Detect">Auto Detect</option>
            <option value="G2">G2 Reviews</option>
            <option value="Capterra">Capterra Reviews</option>
            <option value="Reddit">Reddit Threads</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '8px' }}>
            Raw Text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your user feedback here..."
            style={{
              width: '100%',
              minHeight: '250px',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '14px',
              fontFamily: 'inherit',
              lineHeight: '1.5',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={handleUseSample} style={{
            background: 'none', border: 'none', color: 'var(--primary)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            <FileText style={{ width: '16px', height: '16px' }} />
            Use Sample Feedback Dataset
          </button>
          
          <button className="btn-primary" onClick={handleAnalyzeClick} disabled={!text.trim()} style={{ opacity: text.trim() ? 1 : 0.6 }}>
            <Clipboard style={{ width: '16px', height: '16px' }} />
            Analyze Feedback
          </button>
        </div>
      </div>
    </div>
  );
};
