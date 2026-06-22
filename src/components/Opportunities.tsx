import React from 'react';
import type { OpportunityInsight } from '../types';
import { Lightbulb, ArrowRight, Zap, Users, AlertTriangle, TrendingUp } from 'lucide-react';

interface OpportunitiesProps {
  opportunities: OpportunityInsight[];
  setActiveTab: (tab: string) => void;
  setSelectedOpportunityId: (id: string) => void;
}

export const Opportunities: React.FC<OpportunitiesProps> = ({
  opportunities,
  setActiveTab,
  setSelectedOpportunityId,
}) => {
  const handleGeneratePack = (oppId: string) => {
    setSelectedOpportunityId(oppId);
    setActiveTab('evidence');
  };

  const getImpactColor = (score: number) => {
    if (score >= 8) return '#059669';
    if (score >= 5) return '#d97706';
    return '#dc2626';
  };

  const getEffortColor = (score: number) => {
    if (score <= 3) return '#059669';
    if (score <= 6) return '#d97706';
    return '#dc2626';
  };

  return (
    <div>
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>Product Opportunities</h1>
          <p className="dashboard-subtitle">
            AI-extracted market opportunities and MVP feature recommendations backed by competitor complaint evidence.
          </p>
        </div>
        <span className="badge badge-primary">{opportunities.length} Opportunities Found</span>
      </div>

      <div className="opps-grid">
        {opportunities.map((opp) => (
          <div key={opp.id} className="opp-card">
            <div className="opp-card-header">
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', flex: 1 }}>
                <div style={{ padding: '8px', background: 'var(--primary-light)', borderRadius: '8px', color: 'var(--primary)', flexShrink: 0 }}>
                  <Lightbulb style={{ width: '18px', height: '18px' }} />
                </div>
                <h3 className="opp-title">{opp.title}</h3>
              </div>
              <span className={`badge ${opp.recommendation === 'Build' ? 'badge-primary' : opp.recommendation === 'Validate' ? 'badge-violet' : 'badge-slate'}`}>
                {opp.recommendation}
              </span>
            </div>

            {/* Scores Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
              <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 800, color: getImpactColor(opp.impactScore) }}>{opp.impactScore}/10</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Impact</div>
              </div>
              <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 800, color: getEffortColor(opp.effortScore) }}>{opp.effortScore}/10</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Effort</div>
              </div>
            </div>

            <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
                  <AlertTriangle style={{ width: '12px', height: '12px', color: '#dc2626' }} /> User Pain
                </div>
                <div style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>{opp.userPain}</div>
              </div>

              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
                  <Zap style={{ width: '12px', height: '12px', color: '#d97706' }} /> Evidence Signal
                </div>
                <div style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>{opp.evidence}</div>
              </div>

              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
                  <Users style={{ width: '12px', height: '12px', color: 'var(--primary)' }} /> Target Segment
                </div>
                <div style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>{opp.targetUser}</div>
              </div>

              {opp.whyNow && (
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
                    <TrendingUp style={{ width: '12px', height: '12px', color: '#059669' }} /> Why Now
                  </div>
                  <div style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>{opp.whyNow}</div>
                </div>
              )}
            </div>

            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Suggested MVP Feature</div>
              <p style={{ fontSize: '13px', color: 'var(--primary)', margin: '0 0 16px', lineHeight: '1.4', fontWeight: 600 }}>{opp.mvpFeature}</p>
              
              <button
                className="btn-primary"
                style={{ width: '100%', fontSize: '13px', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                onClick={() => handleGeneratePack(opp.id)}
                id={`generate-pack-btn-${opp.id}`}
              >
                Generate Evidence Pack <ArrowRight style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
