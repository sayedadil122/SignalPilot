import React, { useState } from 'react';
import type { ProblemTheme, RecommendationType } from '../types';
import { ArrowLeft, Check, Edit, ShieldAlert, Award, FileText } from 'lucide-react';

interface ThemeDetailProps {
  theme: ProblemTheme;
  onBack: () => void;
  override?: { recommendation: RecommendationType; reason: string };
  onSaveOverride: (rec: RecommendationType, reason: string) => void;
}

export const ThemeDetail: React.FC<ThemeDetailProps> = ({
  theme,
  onBack,
  override,
  onSaveOverride,
}) => {
  const [showOverrideForm, setShowOverrideForm] = useState(false);
  const [tempRec, setTempRec] = useState<RecommendationType>(
    override ? override.recommendation : theme.opportunityScore >= 80 ? 'Build' : theme.opportunityScore >= 40 ? 'Validate' : 'Ignore'
  );
  const [tempReason, setTempReason] = useState(override ? override.reason : '');

  const aiRec: RecommendationType = theme.opportunityScore >= 80 ? 'Build' : theme.opportunityScore >= 40 ? 'Validate' : 'Ignore';
  const currentRec = override ? override.recommendation : aiRec;

  const handleSave = () => {
    onSaveOverride(tempRec, tempReason);
    setShowOverrideForm(false);
  };

  const handleCancel = () => {
    setTempRec(override ? override.recommendation : aiRec);
    setTempReason(override ? override.reason : '');
    setShowOverrideForm(false);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Back link */}
      <button onClick={onBack} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', marginBottom: '24px' }}>
        <ArrowLeft style={{ width: '16px', height: '16px' }} /> Back to Problem Themes
      </button>

      {/* Header card details */}
      <div className="analyzer-card" style={{ marginBottom: '32px' }}>
        <span className="card-category">{theme.category}</span>
        <h1 style={{ fontSize: '32px', fontWeight: 700, margin: '8px 0 16px', color: 'var(--text-dark)' }}>{theme.title}</h1>
        
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <span className="badge badge-primary">{theme.mentionCount} Mentions</span>
          <span className="badge badge-slate">Confidence: {theme.confidenceScore}%</span>
          <span className="badge badge-slate">Bias Risk: {theme.biasRisk}</span>
          <span className={`badge ${theme.severity === 'High' ? 'badge-high' : theme.severity === 'Medium' ? 'badge-medium' : 'badge-low'}`}>
            {theme.severity} Severity
          </span>
          <span className={`badge ${currentRec === 'Build' ? 'badge-indigo' : currentRec === 'Validate' ? 'badge-violet' : 'badge-slate'}`}>
            Recommendation: {currentRec}
          </span>
        </div>

        <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
          {theme.summary}
        </p>
      </div>

      {/* Deep details columns */}
      <div className="detail-columns">
        <div className="detail-box-group">
          {/* Problem Statement Card */}
          <div className="detail-info-card">
            <span className="detail-label">Problem Statement</span>
            <p className="detail-val">{theme.problemStatement}</p>
          </div>

          {/* Root Cause Card */}
          <div className="detail-info-card">
            <span className="detail-label">Root Cause Hypothesis</span>
            <p className="detail-val">{theme.rootCause}</p>
          </div>

          {/* Why Users Care Card */}
          <div className="detail-info-card">
            <span className="detail-label">Why Users Care (Business Impact)</span>
            <p className="detail-val">{theme.whyUsersCare}</p>
          </div>

          {/* Supporting Review Quotes */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText style={{ width: '16px', height: '16px', color: 'var(--primary)' }} /> Customer Evidence Quotes
            </h3>
            <div className="quotes-container">
              {theme.quotes.map((quote, idx) => (
                <div key={idx} className={`quote-bubble platform-${quote.sourcePlatform.toLowerCase().replace(' ', '-')}`}>
                  <p className="quote-text">“{quote.text}”</p>
                  <div className="quote-meta">
                    <span className="quote-source">
                      <span className="badge badge-platform">{quote.sourcePlatform}</span>
                      {quote.author && <span>{quote.author}</span>}
                    </span>
                    <span className={`badge ${quote.urgency === 'High' ? 'badge-high' : quote.urgency === 'Medium' ? 'badge-medium' : 'badge-low'}`}>
                      {quote.urgency} Urgency
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Strategy Column */}
        <div className="detail-box-group">
          {/* Competitor Gap Card */}
          <div className="strategy-card gap">
            <span className="detail-label" style={{ color: 'var(--warning-text)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldAlert style={{ width: '14px', height: '14px' }} /> Competitor Gap
            </span>
            <p className="detail-val" style={{ marginTop: '8px' }}>{theme.competitorGap}</p>
          </div>

          {/* Product Opportunity Card */}
          <div className="strategy-card opportunity">
            <span className="detail-label" style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Award style={{ width: '14px', height: '14px' }} /> Product Opportunity
            </span>
            <p className="detail-val" style={{ marginTop: '8px', fontWeight: 600 }}>{theme.productOpportunity}</p>
          </div>

          {/* Suggested Feature */}
          <div className="detail-info-card">
            <span className="detail-label">Suggested MVP Feature Idea</span>
            <p className="detail-val" style={{ fontWeight: 600, color: 'var(--primary)' }}>{theme.suggestedFeature}</p>
          </div>

          {/* PM Recommendation Overrides Section */}
          <div className="sidebar-widget" style={{ padding: '20px' }}>
            <span className="widget-title">Recommendation Audit</span>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>AI Default Recommendation</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-dark)', marginTop: '4px' }}>
                  {aiRec} (Opp Score: {theme.opportunityScore}%)
                </div>
              </div>

              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Current Strategic Action</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <span className={`badge ${currentRec === 'Build' ? 'badge-indigo' : currentRec === 'Validate' ? 'badge-violet' : 'badge-slate'}`}>
                    {currentRec}
                  </span>
                  {override && <span style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600 }}>Overridden by PM</span>}
                </div>
              </div>

              {override && (
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Override Rationale</div>
                  <p style={{ fontSize: '13px', color: 'var(--text-dark)', margin: '4px 0 0', fontStyle: 'italic', background: '#f8fafc', padding: '8px', borderRadius: '6px' }}>
                    “{override.reason}”
                  </p>
                </div>
              )}

              {!showOverrideForm ? (
                <button
                  className="btn-secondary"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', fontSize: '13px', padding: '10px' }}
                  onClick={() => setShowOverrideForm(true)}
                  id="override-recommendation-btn"
                >
                  <Edit style={{ width: '14px', height: '14px' }} /> Override Action
                </button>
              ) : (
                <div className="override-container">
                  <span className="override-header">PM Decision Log</span>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text)' }}>Select Recommendation</label>
                    <select
                      className="sort-select"
                      value={tempRec}
                      onChange={(e) => setTempRec(e.target.value as RecommendationType)}
                      style={{ padding: '6px', fontSize: '12.5px' }}
                      id="override-rec-select"
                    >
                      <option value="Build">Build (High Priority MVP)</option>
                      <option value="Validate">Validate (Conduct Research)</option>
                      <option value="Ignore">Ignore (Noise/Low Impact)</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text)' }}>Rationale Reason</label>
                    <textarea
                      className="override-textarea"
                      placeholder="Why are you changing this decision? E.g., Sales validated this is a major churn driver..."
                      value={tempReason}
                      onChange={(e) => setTempReason(e.target.value)}
                      rows={3}
                      id="override-reason-textarea"
                    />
                  </div>

                  <div className="override-buttons">
                    <button
                      className="btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn-primary"
                      style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                      onClick={handleSave}
                      id="confirm-override-btn"
                    >
                      <Check style={{ width: '12px', height: '12px' }} /> Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
