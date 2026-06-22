import React from 'react';
import { X, ArrowRightLeft } from 'lucide-react';
import type { ProblemTheme } from '../types';

interface CompareModalProps {
  themeIds: string[];
  themes: ProblemTheme[];
  onClose: () => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  themeIds,
  themes,
  onClose,
}) => {
  const selectedThemes = themeIds
    .map((id) => themes.find((t) => t.id === id))
    .filter(Boolean) as ProblemTheme[];

  if (selectedThemes.length !== 2) return null;

  const [themeA, themeB] = selectedThemes;

  return (
    <div className="compare-overlay" onClick={onClose}>
      <div className="compare-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ArrowRightLeft style={{ color: 'var(--primary)', width: '20px', height: '20px' }} />
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-dark)' }}>Theme Comparison</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} id="close-compare-modal-btn">
            <X style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        <div className="compare-grid">
          {/* Theme A */}
          <div className="compare-col">
            <div className="compare-card" style={{ borderLeft: '4px solid var(--primary)' }}>
              <span className="card-category">{themeA.category}</span>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-dark)', marginTop: '4px' }}>{themeA.title}</h3>
              
              <div className="compare-score-row">
                <div className="compare-score-box">
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Mentions</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-dark)' }}>{themeA.mentionCount}</div>
                </div>
                <div className="compare-score-box">
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Opportunity</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--primary)' }}>{themeA.opportunityScore}%</div>
                </div>
                <div className="compare-score-box">
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Severity</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: themeA.severity === 'High' ? 'var(--danger-text)' : 'var(--warning-text)', textTransform: 'capitalize', marginTop: '6px' }}>
                    {themeA.severity}
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-info-card">
              <span className="detail-label">Problem Statement</span>
              <p className="detail-val" style={{ fontSize: '13.5px' }}>{themeA.problemStatement}</p>
            </div>

            <div className="strategy-card gap">
              <span className="detail-label" style={{ color: 'var(--warning-text)' }}>Competitor Gap</span>
              <p className="detail-val" style={{ fontSize: '13.5px', marginTop: '4px' }}>{themeA.competitorGap}</p>
            </div>

            <div className="detail-info-card">
              <span className="detail-label">Suggested MVP Feature</span>
              <p className="detail-val" style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--primary)' }}>{themeA.suggestedFeature}</p>
            </div>

            {themeA.quotes[0] && (
              <div className="quote-bubble" style={{ borderLeftColor: 'var(--primary)' }}>
                <p className="quote-text" style={{ fontSize: '13px' }}>“{themeA.quotes[0].text}”</p>
                <div className="quote-meta">
                  <span>{themeA.quotes[0].author || 'Verified user'} on {themeA.quotes[0].sourcePlatform}</span>
                </div>
              </div>
            )}
          </div>

          {/* Theme B */}
          <div className="compare-col">
            <div className="compare-card" style={{ borderLeft: '4px solid var(--accent)' }}>
              <span className="card-category">{themeB.category}</span>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-dark)', marginTop: '4px' }}>{themeB.title}</h3>
              
              <div className="compare-score-row">
                <div className="compare-score-box">
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Mentions</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-dark)' }}>{themeB.mentionCount}</div>
                </div>
                <div className="compare-score-box">
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Opportunity</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--accent)' }}>{themeB.opportunityScore}%</div>
                </div>
                <div className="compare-score-box">
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Severity</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: themeB.severity === 'High' ? 'var(--danger-text)' : 'var(--warning-text)', textTransform: 'capitalize', marginTop: '6px' }}>
                    {themeB.severity}
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-info-card">
              <span className="detail-label">Problem Statement</span>
              <p className="detail-val" style={{ fontSize: '13.5px' }}>{themeB.problemStatement}</p>
            </div>

            <div className="strategy-card gap">
              <span className="detail-label" style={{ color: 'var(--warning-text)' }}>Competitor Gap</span>
              <p className="detail-val" style={{ fontSize: '13.5px', marginTop: '4px' }}>{themeB.competitorGap}</p>
            </div>

            <div className="detail-info-card">
              <span className="detail-label">Suggested MVP Feature</span>
              <p className="detail-val" style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--accent)' }}>{themeB.suggestedFeature}</p>
            </div>

            {themeB.quotes[0] && (
              <div className="quote-bubble" style={{ borderLeftColor: 'var(--accent)' }}>
                <p className="quote-text" style={{ fontSize: '13px' }}>“{themeB.quotes[0].text}”</p>
                <div className="quote-meta">
                  <span>{themeB.quotes[0].author || 'Verified user'} on {themeB.quotes[0].sourcePlatform}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
