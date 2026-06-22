import React, { useState } from 'react';
import { Cpu, Check, ExternalLink } from 'lucide-react';

interface Connector {
  id: string;
  name: string;
  logo: string;
  category: string;
  description: string;
  useCase: string;
  status: 'coming_soon' | 'beta' | 'connected';
}

const CONNECTORS: Connector[] = [
  {
    id: 'slack',
    name: 'Slack',
    logo: '💬',
    category: 'Communication',
    description: 'Stream AI-generated weekly insight digests directly into product team Slack channels.',
    useCase: 'Auto-post competitor alerts to #product-intelligence channel',
    status: 'coming_soon',
  },
  {
    id: 'jira',
    name: 'Jira Product Discovery',
    logo: '🎯',
    category: 'Roadmap',
    description: 'Push evidence packs directly into JPD epics. Link competitor gaps to backlog items automatically.',
    useCase: 'Create Jira epics from evidence packs with one click',
    status: 'coming_soon',
  },
  {
    id: 'linear',
    name: 'Linear',
    logo: '⚡',
    category: 'Roadmap',
    description: 'Sync SignalPilot opportunities directly into Linear projects as trackable issues.',
    useCase: 'Convert product opportunities into Linear issues instantly',
    status: 'coming_soon',
  },
  {
    id: 'zendesk',
    name: 'Zendesk',
    logo: '🎧',
    category: 'Customer Support',
    description: 'Auto-import and cluster support tickets from your Zendesk workspace for internal analysis.',
    useCase: 'Analyze support ticket themes weekly for product pain signals',
    status: 'coming_soon',
  },
  {
    id: 'intercom',
    name: 'Intercom',
    logo: '📩',
    category: 'Customer Support',
    description: 'Ingest live Intercom conversations to detect emerging user pain clusters in real time.',
    useCase: 'Monitor live chats for recurring complaint themes',
    status: 'coming_soon',
  },
  {
    id: 'gong',
    name: 'Gong',
    logo: '🔔',
    category: 'Sales Intelligence',
    description: 'Extract product signals from sales call recordings and connect them to roadmap opportunities.',
    useCase: 'Surface competitor objections from deal recordings',
    status: 'coming_soon',
  },
  {
    id: 'notion',
    name: 'Notion',
    logo: '📝',
    category: 'Documentation',
    description: 'Export evidence packs as structured Notion pages shareable with your entire product team.',
    useCase: 'Push PM decision logs directly to product wiki',
    status: 'coming_soon',
  },
  {
    id: 'gdrive',
    name: 'Google Drive',
    logo: '📁',
    category: 'Documentation',
    description: 'Save and sync evidence packs and weekly reports to shared Google Drive folders.',
    useCase: 'Auto-sync reports to product team shared drive',
    status: 'coming_soon',
  },
  {
    id: 'productboard',
    name: 'Productboard',
    logo: '📋',
    category: 'Roadmap',
    description: 'Push SignalPilot-discovered opportunities directly into Productboard as feature cards.',
    useCase: 'Enrich Productboard features with competitor gap evidence',
    status: 'coming_soon',
  },
  {
    id: 'github',
    name: 'GitHub Issues',
    logo: '🐙',
    category: 'Engineering',
    description: 'Convert MVP feature suggestions from evidence packs into GitHub issues for engineering teams.',
    useCase: 'Create GitHub issues from PM opportunity recommendations',
    status: 'coming_soon',
  },
  {
    id: 'supabase',
    name: 'Supabase',
    logo: '🗄️',
    category: 'Database',
    description: 'Store and query all SignalPilot analysis results in your own Supabase instance.',
    useCase: 'Self-host analysis data with full CRUD access via SQL',
    status: 'beta',
  },
  {
    id: 'hubspot',
    name: 'HubSpot CRM',
    logo: '🧲',
    category: 'Sales Intelligence',
    description: 'Map competitor weaknesses to CRM contacts to enable targeted sales campaigns.',
    useCase: 'Tag competitor switch prospects based on review complaints',
    status: 'coming_soon',
  },
];

const CATEGORY_ORDER = ['Roadmap', 'Customer Support', 'Communication', 'Sales Intelligence', 'Documentation', 'Engineering', 'Database'];

export const IntegrationsMCP: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...CATEGORY_ORDER.filter(c => CONNECTORS.some(con => con.category === c))];
  const filtered = activeCategory === 'All' ? CONNECTORS : CONNECTORS.filter(c => c.category === activeCategory);

  return (
    <div>
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Cpu style={{ width: '20px', height: '20px', color: 'var(--primary)' }} />
            <span className="badge badge-primary">MCP-Powered Connectors</span>
          </div>
          <h1>Integrations</h1>
          <p className="dashboard-subtitle">
            SignalPilot will connect to your team's tools via the Model Context Protocol (MCP). Plug competitor intelligence directly into your roadmap, support, and communication workflows.
          </p>
        </div>
      </div>

      {/* Category filter tabs */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={activeCategory === cat ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '6px 14px', fontSize: '13px', fontWeight: 600 }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Connector Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {filtered.map(connector => (
          <div
            key={connector.id}
            style={{
              background: '#fff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              transition: 'box-shadow 0.2s ease',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: '#f1f5f9', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '20px'
                }}>
                  {connector.logo}
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-dark)' }}>{connector.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{connector.category}</div>
                </div>
              </div>
              {connector.status === 'beta' ? (
                <span className="badge badge-violet" style={{ fontSize: '10px' }}>Beta</span>
              ) : (
                <span className="badge badge-slate" style={{ fontSize: '10px' }}>Coming Soon</span>
              )}
            </div>

            {/* Description */}
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
              {connector.description}
            </p>

            {/* Use case */}
            <div style={{
              background: '#f8fafc', borderRadius: '8px', padding: '10px 12px',
              fontSize: '12px', color: 'var(--primary)', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: '6px'
            }}>
              <Check style={{ width: '13px', height: '13px' }} />
              {connector.useCase}
            </div>

            {/* CTA */}
            <button
              disabled
              style={{
                width: '100%', padding: '10px', borderRadius: '8px',
                border: '1px solid #e2e8f0', background: '#f8fafc',
                color: '#94a3b8', fontSize: '13px', fontWeight: 600,
                cursor: 'not-allowed', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: '6px'
              }}
            >
              <ExternalLink style={{ width: '14px', height: '14px' }} />
              {connector.status === 'beta' ? 'Request Beta Access' : 'Connect (Phase 2)'}
            </button>
          </div>
        ))}
      </div>

      {/* Phase notice */}
      <div className="phase-notice" style={{ marginTop: '40px', justifyContent: 'flex-start' }}>
        <Cpu style={{ width: '16px', height: '16px' }} />
        <span>
          MCP (Model Context Protocol) integrations will be enabled in Phase 2 using a dedicated backend service.
          Express interest by emailing <strong>integrations@signalpilot.io</strong>
        </span>
      </div>
    </div>
  );
};
