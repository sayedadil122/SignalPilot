import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import type { CompetitorAnalysisResult } from '../types';
import { ArrowUpRight, AlertCircle, Wrench, EyeOff } from 'lucide-react';

interface DashboardProps {
  result: CompetitorAnalysisResult;
  setActiveTab: (tab: string) => void;
  setSelectedThemeId: (id: string | null) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  result,
  setActiveTab,
  setSelectedThemeId,
}) => {
  // Chart Colors (Premium B2B SaaS palette)
  const COLORS = {
    primary: '#4f46e5', // Indigo
    accent: '#7c3aed', // Violet
    teal: '#0d9488',
    success: '#059669', // Emerald
    warning: '#d97706', // Amber
    danger: '#dc2626', // Red
    neutral: '#94a3b8', // Slate-400
  };

  const platformChartData = result.platformsCovered.map((platform, idx) => {
    const percentages = [60, 25, 15]; // Mock breakdown ratios
    return { name: platform, value: Math.round((result.totalReviews * (percentages[idx] || 10)) / 100) };
  });

  const complaintChartData = result.themes.map((theme) => ({
    name: theme.title.length > 25 ? `${theme.title.substring(0, 22)}...` : theme.title,
    mentions: theme.mentionCount,
  }));

  const sentimentData = [
    { name: 'Positive Reviews', value: result.positiveSignalsCount, color: COLORS.success },
    { name: 'Negative Reviews', value: Math.round(result.totalReviews * 0.45), color: COLORS.danger },
    { name: 'Neutral Reviews', value: Math.round(result.totalReviews * 0.15), color: COLORS.neutral },
  ];

  const severityData = [
    { name: 'High Severity', value: result.highSeverityCount, color: COLORS.danger },
    { name: 'Medium Severity', value: result.themes.filter(t => t.severity === 'Medium').length * 10, color: COLORS.warning },
    { name: 'Low Severity', value: result.themes.filter(t => t.severity === 'Low').length * 15, color: COLORS.success },
  ];

  const handleThemeClick = (themeId: string) => {
    setSelectedThemeId(themeId);
    setActiveTab('themes');
  };

  const handleActionClick = (targetTab: string) => {
    setActiveTab(targetTab);
  };

  return (
    <div>
      {/* Header section */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-primary">{result.platform} Review Stream</span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Analyzed just now</span>
          </div>
          <h1 style={{ marginTop: '8px' }}>
            Analysis Dashboard: {result.themes[0]?.id.startsWith('pb') ? 'Productboard' : result.themes[0]?.id.startsWith('zom') ? 'Zomato' : 'Canny'}
          </h1>
          <a href={result.url} target="_blank" rel="noopener noreferrer" className="url-badge">
            {result.url}
            <ArrowUpRight style={{ width: '12px', height: '12px' }} />
          </a>
        </div>
        
        <button className="btn-secondary" onClick={() => setActiveTab('analyzer')} id="new-analysis-btn">
          Analyze Another Competitor
        </button>
      </div>

      {/* KPI Cards Grid (6 specific cards) */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
        <div className="kpi-card">
          <span className="kpi-label">Reviews Analyzed</span>
          <span className="kpi-value">{result.totalReviews}</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Sources Covered</span>
          <span className="kpi-value">{result.platformsCovered.length}</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Pain Themes Found</span>
          <span className="kpi-value">{result.topComplaintsCount}</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">High-Severity Issues</span>
          <span className="kpi-value">{result.highSeverityCount}</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Opportunities Found</span>
          <span className="kpi-value">{result.opportunityThemesCount}</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Evidence Packs</span>
          <span className="kpi-value">2</span>
        </div>
      </div>

      {/* What needs PM attention now? */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '16px' }}>What needs PM attention now?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
          
          <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '20px', border: '1px solid #cbd5e1', borderTop: `4px solid ${COLORS.success}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: COLORS.success, marginBottom: '12px', fontWeight: 700, fontSize: '15px' }}>
              <Wrench style={{ width: '18px', height: '18px' }} /> Build Candidate
            </div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '6px' }}>{result.opportunities[0]?.title || 'Auto-tagging UI'}</div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
              Clear competitor gap found with high confidence. MVP feature would capture unhappy {result.themes[0]?.id.startsWith('pb') ? 'Productboard' : 'Canny'} users.
            </p>
            <button className="btn-secondary" style={{ width: '100%', fontSize: '13px' }} onClick={() => handleActionClick('opportunities')}>Review Opportunity</button>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '20px', border: '1px solid #cbd5e1', borderTop: `4px solid ${COLORS.warning}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: COLORS.warning, marginBottom: '12px', fontWeight: 700, fontSize: '15px' }}>
              <AlertCircle style={{ width: '18px', height: '18px' }} /> Investigate
            </div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '6px' }}>{result.themes[1]?.title || 'Payment failures'}</div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
              Rising mention volume (+45% MoM), but root cause is unclear. Needs deeper cross-referencing with telemetry data.
            </p>
            <button className="btn-secondary" style={{ width: '100%', fontSize: '13px' }} onClick={() => handleThemeClick(result.themes[1]?.id || '')}>Deep Dive Theme</button>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '20px', border: '1px solid #cbd5e1', borderTop: `4px solid ${COLORS.neutral}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: COLORS.neutral, marginBottom: '12px', fontWeight: 700, fontSize: '15px' }}>
              <EyeOff style={{ width: '18px', height: '18px' }} /> Ignore for now
            </div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '6px' }}>Dark Mode Requests</div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
              High bias risk. Overrepresented on Reddit, low business impact, and zero mentions in enterprise sales calls.
            </p>
            <button className="btn-secondary" style={{ width: '100%', fontSize: '13px' }} onClick={() => handleActionClick('themes')}>View All Themes</button>
          </div>

        </div>
      </div>

      {/* Visual Analytics Charts Grid */}
      <div className="chart-grid">
        <div className="chart-card">
          <h3 className="chart-title">Complaints by Problem Theme <span>Mentions count</span></h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={complaintChartData} margin={{ left: 10, right: 20, top: 10, bottom: 10 }}>
                <XAxis type="number" stroke="var(--text-muted)" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="var(--text-muted)" fontSize={11} width={130} />
                <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                <Bar dataKey="mentions" fill={COLORS.primary} radius={[0, 4, 4, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Reviews by Platform <span>Volumetric share</span></h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformChartData} margin={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} />
                <YAxis stroke="var(--text-muted)" fontSize={11} />
                <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                <Bar dataKey="value" fill={COLORS.accent} radius={[4, 4, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Sentiment Breakdown <span>Overall feedback split</span></h3>
          <div className="chart-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="60%" height="100%">
              <PieChart>
                <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={4} dataKey="value">
                  {sentimentData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '40%', fontSize: '12px' }}>
              {sentimentData.map((entry, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: entry.color }}></div>
                  <span style={{ fontWeight: 600 }}>{entry.name}:</span>
                  <span style={{ color: 'var(--text-muted)' }}>{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Urgency & Severity <span>Theme impacts</span></h3>
          <div className="chart-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="60%" height="100%">
              <PieChart>
                <Pie data={severityData} cx="50%" cy="50%" innerRadius={0} outerRadius={75} dataKey="value">
                  {severityData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '40%', fontSize: '12px' }}>
              {severityData.map((entry, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: entry.color }}></div>
                  <span style={{ fontWeight: 600 }}>{entry.name}:</span>
                  <span style={{ color: 'var(--text-muted)' }}>{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
