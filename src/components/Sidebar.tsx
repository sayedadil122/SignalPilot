import React from 'react';
import {
  Home,
  Search,
  Clipboard,
  Upload,
  Clock,
  LayoutDashboard,
  AlertTriangle,
  Table,
  Lightbulb,
  FileText,
  FolderOpen,
  Cpu,
  Settings as SettingsIcon,
  LogOut,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  hasAnalysis: boolean;
  userEmail?: string;
  onSignOut: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  hasAnalysis,
  userEmail,
  onSignOut,
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, requiresAnalysis: false },
    { id: 'analyzer', label: 'URL Analyzer', icon: Search, requiresAnalysis: false },
    { id: 'paste', label: 'Paste Feedback', icon: Clipboard, requiresAnalysis: false },
    { id: 'upload', label: 'Upload Reviews', icon: Upload, requiresAnalysis: false },
    { id: 'monitor', label: 'Signal Monitor', icon: Clock, requiresAnalysis: false },
    { id: 'dashboard', label: 'Review Dashboard', icon: LayoutDashboard, requiresAnalysis: true },
    { id: 'themes', label: 'Problem Themes', icon: AlertTriangle, requiresAnalysis: true },
    { id: 'matrix', label: 'Competitor Gap Matrix', icon: Table, requiresAnalysis: true },
    { id: 'opportunities', label: 'Opportunities', icon: Lightbulb, requiresAnalysis: true },
    { id: 'evidence', label: 'Evidence Packs', icon: FileText, requiresAnalysis: true },
    { id: 'projects', label: 'Research Projects', icon: FolderOpen, requiresAnalysis: false },
    { id: 'integrations', label: 'Integrations / MCP', icon: Cpu, requiresAnalysis: false },
    { id: 'settings', label: 'Settings', icon: SettingsIcon, requiresAnalysis: false },
  ];

  return (
    <aside className="sidebar">
      <div className="brand-section">
        <div className="brand-logo">SP</div>
        <div>
          <span className="brand-name">SignalPilot</span>
        </div>
      </div>

      <nav className="nav-links" style={{ overflowY: 'auto', flex: 1, paddingBottom: '16px' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isDisabled = item.requiresAnalysis && !hasAnalysis;
          
          return (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => !isDisabled && setActiveTab(item.id)}
              disabled={isDisabled}
              style={{
                opacity: isDisabled ? 0.4 : 1,
                cursor: isDisabled ? 'not-allowed' : 'pointer',
              }}
              title={isDisabled ? 'Analyze feedback first to unlock this screen' : ''}
              id={`nav-link-${item.id}`}
            >
              <Icon className="nav-icon" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-account">
          <div className="account-avatar">{userEmail?.charAt(0).toUpperCase() ?? 'U'}</div>
          <div className="account-meta">
            <span>Signed in</span>
            <strong>{userEmail}</strong>
          </div>
          <button className="account-signout" type="button" onClick={onSignOut} title="Sign out">
            <LogOut size={16} />
          </button>
        </div>
        <div className="footer-quote-label">Core Philosophy</div>
        <p className="footer-quote" style={{ marginBottom: '8px' }}>
          “Most tools collect feedback. SignalPilot discovers market gaps from real user complaints.”
        </p>
        <p className="footer-quote" style={{ fontSize: '11px', color: 'var(--primary)' }}>
          Reviews → Problems → Opportunities
        </p>
      </div>
    </aside>
  );
};
