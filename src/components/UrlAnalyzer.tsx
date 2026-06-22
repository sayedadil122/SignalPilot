import React, { useState } from 'react';
import { Search, Info, HelpCircle } from 'lucide-react';
import type { PlatformType } from '../types';

interface UrlAnalyzerProps {
  onAnalyze: (url: string, platform: PlatformType | 'Auto Detect') => void;
}

export const UrlAnalyzer: React.FC<UrlAnalyzerProps> = ({ onAnalyze }) => {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState<PlatformType | 'Auto Detect'>('Auto Detect');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Please enter a product or competitor URL.');
      return;
    }
    
    // Simple URL validation
    if (!url.startsWith('http://') && !url.startsWith('https://') && !url.includes('.')) {
      setError('Please enter a valid website or review page URL.');
      return;
    }
    
    setError('');
    onAnalyze(url, platform);
  };

  const handleTrySample = () => {
    // Alternate sample URLs
    const samples = [
      'https://www.g2.com/products/productboard/reviews',
      'https://canny.io/feedback-tool/reviews',
    ];
    const randomSample = samples[Math.floor(Math.random() * samples.length)];
    setUrl(randomSample);
    setPlatform('Auto Detect');
    setError('');
  };

  return (
    <div className="analyzer-landing">
      <div className="tagline-badge">Pioneering Competitor Intelligence</div>
      <h1 className="landing-title">Turn competitor reviews into product opportunities</h1>
      <p className="landing-subtitle">
        Analyze reviews from G2, Capterra, Reddit, App Store, Play Store, Product Hunt, TrustRadius, and other platforms to discover what users love, hate, and still need.
      </p>

      <div className="analyzer-card">
        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '8px', display: 'block' }}>
            Which product or competitor do you want to analyze?
          </label>
          
          <div className="analyzer-input-group">
            <div className="analyzer-input-wrapper">
              <Search className="input-icon-left" />
              <input
                type="text"
                className="analyzer-input"
                placeholder="Paste a G2, Capterra, Reddit, App Store, Play Store, or product URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                id="url-analyzer-input"
              />
            </div>
            
            <select
              className="platform-dropdown"
              value={platform}
              onChange={(e) => setPlatform(e.target.value as PlatformType | 'Auto Detect')}
              id="platform-selector"
            >
              <option value="Auto Detect">Auto Detect Platform</option>
              <option value="G2">G2</option>
              <option value="Capterra">Capterra</option>
              <option value="Reddit">Reddit</option>
              <option value="App Store">App Store</option>
              <option value="Play Store">Play Store</option>
              <option value="Product Hunt">Product Hunt</option>
              <option value="TrustRadius">TrustRadius</option>
              <option value="Quora">Quora</option>
              <option value="Custom Website">Custom Website</option>
            </select>
          </div>

          {error && (
            <p style={{ color: 'var(--danger)', fontSize: '13px', fontWeight: 500, marginTop: '-12px', marginBottom: '16px' }}>
              {error}
            </p>
          )}

          <div className="analyzer-buttons">
            <button type="submit" className="btn-primary" id="analyze-reviews-btn">
              Analyze Reviews
            </button>
            <button type="button" className="btn-secondary" onClick={handleTrySample} id="try-sample-btn">
              Try Sample Competitor
            </button>
          </div>
        </form>
      </div>

      <div className="differentiation-box">
        <div className="diff-icon-container">
          <Info style={{ width: '22px', height: '22px' }} />
        </div>
        <div>
          <div className="diff-title">How it differs from typical feedback tools</div>
          <p className="diff-text">
            Most tools require you to capture and manually tag your own customer feedback. SignalPilot automatically scans competitor reviews, extracts real customer pain points, maps them against competitor gaps, and highlights new product opportunities.
          </p>
        </div>
      </div>

      <div className="phase-notice">
        <HelpCircle style={{ width: '16px', height: '16px' }} />
        <span>Real URL scraping, platform APIs, and review extraction will be implemented in Phase 2 using backend services.</span>
      </div>
    </div>
  );
};
