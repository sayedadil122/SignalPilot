import React, { useState } from 'react';
import type { ProblemTheme, RecommendationType } from '../types';
import { ArrowLeft, Check, ClipboardCheck, Edit, FileText, HelpCircle, Layers, MessageSquare, ShieldAlert } from 'lucide-react';

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

  const defaultRec: RecommendationType = theme.opportunityScore >= 80 ? 'Build' : theme.opportunityScore >= 40 ? 'Validate' : 'Ignore';
  const currentRec = override ? override.recommendation : defaultRec;

  const handleSave = () => {
    onSaveOverride(tempRec, tempReason);
    setShowOverrideForm(false);
  };

  const handleCancel = () => {
    setTempRec(override ? override.recommendation : defaultRec);
    setTempReason(override ? override.reason : '');
    setShowOverrideForm(false);
  };

  return (
    <div className="theme-document">
      <button onClick={onBack} className="btn-secondary compact-button">
        <ArrowLeft size={16} /> Back to problem themes
      </button>

      <header className="theme-doc-header">
        <span className="eyebrow">{theme.category}</span>
        <h1>{theme.title}</h1>
        <p>{theme.summary}</p>
        <div className="theme-doc-meta">
          <span>{theme.mentionCount} mentions</span>
          <span>{theme.confidenceScore}% confidence</span>
          <span>{theme.biasRisk} bias risk</span>
          <span>{theme.severity} severity</span>
          <span>Recommended: {currentRec}</span>
        </div>
      </header>

      <section className="theme-doc-grid">
        <article className="doc-section">
          <div className="doc-section-title">
            <FileText size={17} />
            <span>Expressed Pain</span>
          </div>
          <p>{theme.problemStatement}</p>
        </article>

        <article className="doc-section">
          <div className="doc-section-title">
            <Layers size={17} />
            <span>Possible Deeper Pain</span>
          </div>
          <p>{theme.rootCause}</p>
        </article>

        <article className="doc-section">
          <div className="doc-section-title">
            <ClipboardCheck size={17} />
            <span>Evidence Strength</span>
          </div>
          <p>{theme.whyUsersCare}</p>
          <div className="evidence-meter">
            <i style={{ width: `${theme.confidenceScore}%` }} />
          </div>
        </article>

        <article className="doc-section">
          <div className="doc-section-title">
            <ShieldAlert size={17} />
            <span>Bias Risk</span>
          </div>
          <p>{theme.biasRisk} risk. Validate whether this pattern appears beyond the loudest source or segment.</p>
        </article>

        <article className="doc-section">
          <div className="doc-section-title">
            <HelpCircle size={17} />
            <span>Validation Needed</span>
          </div>
          <p>{theme.competitorGap}</p>
        </article>

        <article className="doc-section">
          <div className="doc-section-title">
            <ClipboardCheck size={17} />
            <span>Recommended PM Action</span>
          </div>
          <p>{theme.productOpportunity}</p>
          <strong>{theme.suggestedFeature}</strong>
        </article>
      </section>

      <section className="theme-doc-lower">
        <div className="supporting-quotes-panel">
          <div className="section-heading tight">
            <h2>Supporting Quotes</h2>
            <p>Raw evidence that can be shown in a product review meeting.</p>
          </div>
          <div className="quotes-container">
            {theme.quotes.map((quote, idx) => (
              <div key={idx} className={`quote-bubble platform-${quote.sourcePlatform.toLowerCase().replace(' ', '-')}`}>
                <div className="quote-heading">
                  <MessageSquare size={15} />
                  <span>{quote.sourcePlatform}</span>
                  {quote.author && <span>{quote.author}</span>}
                </div>
                <p className="quote-text">"{quote.text}"</p>
                <div className="quote-meta">
                  <span className={`badge ${quote.urgency === 'High' ? 'badge-high' : quote.urgency === 'Medium' ? 'badge-medium' : 'badge-low'}`}>
                    {quote.urgency} urgency
                  </span>
                  <span>{quote.sentiment} sentiment</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="recommendation-panel">
          <div className="section-heading tight">
            <h2>Decision Log</h2>
            <p>Keep human judgment visible next to the automated recommendation.</p>
          </div>

          <div className="decision-log-row">
            <span>Default recommendation</span>
            <strong>{defaultRec}</strong>
          </div>
          <div className="decision-log-row">
            <span>Current action</span>
            <strong>{currentRec}</strong>
          </div>
          <div className="decision-log-row">
            <span>Opportunity score</span>
            <strong>{theme.opportunityScore}%</strong>
          </div>

          {override && (
            <div className="override-note">
              <span>PM rationale</span>
              <p>"{override.reason}"</p>
            </div>
          )}

          {!showOverrideForm ? (
            <button className="btn-secondary compact-button full-width" onClick={() => setShowOverrideForm(true)} id="override-recommendation-btn">
              <Edit size={14} /> Override action
            </button>
          ) : (
            <div className="override-container">
              <span className="override-header">PM Decision Log</span>
              <label>
                <span>Recommendation</span>
                <select
                  className="sort-select"
                  value={tempRec}
                  onChange={(e) => setTempRec(e.target.value as RecommendationType)}
                  id="override-rec-select"
                >
                  <option value="Build">Build</option>
                  <option value="Validate">Validate</option>
                  <option value="Ignore">Ignore</option>
                </select>
              </label>
              <label>
                <span>Rationale</span>
                <textarea
                  className="override-textarea"
                  placeholder="Why are you changing this decision?"
                  value={tempReason}
                  onChange={(e) => setTempReason(e.target.value)}
                  rows={4}
                  id="override-reason-textarea"
                />
              </label>
              <div className="override-buttons">
                <button className="btn-secondary compact-button" onClick={handleCancel}>Cancel</button>
                <button className="btn-primary compact-button" onClick={handleSave} id="confirm-override-btn">
                  <Check size={12} /> Save
                </button>
              </div>
            </div>
          )}
        </aside>
      </section>
    </div>
  );
};
