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
import { AlertCircle, ArrowRight, ArrowUpRight, ClipboardCheck, EyeOff, FileText, Route } from 'lucide-react';

interface DashboardProps {
  result: CompetitorAnalysisResult;
  setActiveTab: (tab: string) => void;
  setSelectedThemeId: (id: string | null) => void;
}

const COLORS = {
  primary: '#2563eb',
  accent: '#7c3aed',
  success: '#059669',
  warning: '#d97706',
  danger: '#dc2626',
  neutral: '#94a3b8',
};

export const Dashboard: React.FC<DashboardProps> = ({
  result,
  setActiveTab,
  setSelectedThemeId,
}) => {
  const company = result.themes[0]?.id.startsWith('pb')
    ? 'Productboard'
    : result.themes[0]?.id.startsWith('zom')
    ? 'Zomato'
    : 'Canny';

  const primaryTheme = result.themes[0];
  const validationTheme = result.themes[1] ?? result.themes[0];

  const complaintChartData = result.themes.map((theme) => ({
    name: theme.title.length > 28 ? `${theme.title.substring(0, 25)}...` : theme.title,
    mentions: theme.mentionCount,
  }));

  const sentimentData = [
    { name: 'Positive', value: result.positiveSignalsCount, color: COLORS.success },
    { name: 'Negative', value: Math.round(result.totalReviews * 0.45), color: COLORS.danger },
    { name: 'Neutral', value: Math.round(result.totalReviews * 0.15), color: COLORS.neutral },
  ];

  const decisionCards = [
    {
      label: 'What needs attention now',
      title: result.opportunities[0]?.title ?? primaryTheme?.title ?? 'Review top opportunity',
      body: 'Strong enough evidence to discuss as a build candidate or attach to a planning doc.',
      action: 'Review opportunity',
      icon: ClipboardCheck,
      tone: 'success',
      onClick: () => setActiveTab('opportunities'),
    },
    {
      label: 'What needs validation',
      title: validationTheme?.title ?? 'Validate unclear demand',
      body: 'The signal is meaningful, but the root cause needs customer or telemetry validation.',
      action: 'Open theme detail',
      icon: AlertCircle,
      tone: 'warning',
      onClick: () => {
        setSelectedThemeId(validationTheme?.id ?? null);
        setActiveTab('themes');
      },
    },
    {
      label: 'What looks like noise',
      title: 'Requests with segment bias',
      body: 'Treat high-volume but low-confidence themes as noise until another source confirms them.',
      action: 'View themes',
      icon: EyeOff,
      tone: 'neutral',
      onClick: () => setActiveTab('themes'),
    },
    {
      label: 'What can become an evidence pack',
      title: result.opportunities[1]?.title ?? 'Create stakeholder-ready evidence',
      body: 'Bundle quotes, problem framing, and recommended next action for product review.',
      action: 'Open evidence packs',
      icon: FileText,
      tone: 'primary',
      onClick: () => setActiveTab('evidence'),
    },
  ];

  return (
    <div className="decision-dashboard">
      <header className="dashboard-header decision-header">
        <div className="dashboard-title-group">
          <span className="eyebrow">{result.platform} review stream</span>
          <h1>{company} decision workspace</h1>
          <p className="dashboard-subtitle">
            Evidence-backed hypotheses, validation needs, and recommended PM actions from {result.totalReviews} feedback signals.
          </p>
          <a href={result.url} target="_blank" rel="noopener noreferrer" className="url-badge">
            {result.url}
            <ArrowUpRight size={12} />
          </a>
        </div>

        <button className="btn-secondary" onClick={() => setActiveTab('analyzer')} id="new-analysis-btn">
          Analyze another source
        </button>
      </header>

      <section className="kpi-grid decision-kpis">
        <div className="kpi-card">
          <span className="kpi-label">Signal volume</span>
          <span className="kpi-value">{result.totalReviews}</span>
          <span className="kpi-sub">Reviews analyzed</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Decision themes</span>
          <span className="kpi-value">{result.topComplaintsCount}</span>
          <span className="kpi-sub">Pain clusters found</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Validation load</span>
          <span className="kpi-value">{result.highSeverityCount}</span>
          <span className="kpi-sub">High-severity items</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">PM actions</span>
          <span className="kpi-value">{result.opportunityThemesCount}</span>
          <span className="kpi-sub">Opportunities ready</span>
        </div>
      </section>

      <section className="decision-card-grid">
        {decisionCards.map((card) => {
          const Icon = card.icon;
          return (
            <article className={`decision-card tone-${card.tone}`} key={card.label}>
              <div className="decision-card-top">
                <Icon size={18} />
                <span>{card.label}</span>
              </div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <button type="button" className="text-action" onClick={card.onClick}>
                {card.action}
                <ArrowRight size={15} />
              </button>
            </article>
          );
        })}
      </section>

      <section className="dashboard-grid decision-support-grid">
        <div className="chart-card decision-chart-card">
          <div className="chart-title">
            <span>Theme evidence by mention count</span>
            <small>Supports prioritization</small>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={complaintChartData} margin={{ left: 10, right: 20, top: 10, bottom: 10 }}>
                <XAxis type="number" stroke="var(--text-muted)" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="var(--text-muted)" fontSize={11} width={150} />
                <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                <Bar dataKey="mentions" fill={COLORS.primary} radius={[0, 6, 6, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card decision-summary-card">
          <div className="chart-title">
            <span>Signal quality mix</span>
            <small>Context, not the decision</small>
          </div>
          <div className="chart-container decision-pie">
            <ResponsiveContainer width="52%" height="100%">
              <PieChart>
                <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={58} outerRadius={78} paddingAngle={4} dataKey="value">
                  {sentimentData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="chart-legend">
              {sentimentData.map((entry) => (
                <div key={entry.name}>
                  <i style={{ background: entry.color }} />
                  <span>{entry.name}</span>
                  <strong>{entry.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pm-action-strip">
        <Route size={18} />
        <span>Recommended next step</span>
        <strong>Use the top two themes to draft validation questions before committing roadmap capacity.</strong>
      </section>
    </div>
  );
};
