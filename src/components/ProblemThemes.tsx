import React, { useState } from 'react';
import type { ProblemTheme, RecommendationType } from '../types';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { ThemeDetail } from './ThemeDetail';

interface ProblemThemesProps {
  themes: ProblemTheme[];
  checkedThemeIds: string[];
  toggleCompareTheme: (id: string) => void;
  selectedThemeId: string | null;
  setSelectedThemeId: (id: string | null) => void;
  themeOverrides: Record<string, { recommendation: RecommendationType; reason: string }>;
  onSaveOverride: (themeId: string, recommendation: RecommendationType, reason: string) => void;
}

export const ProblemThemes: React.FC<ProblemThemesProps> = ({
  themes,
  checkedThemeIds,
  toggleCompareTheme,
  selectedThemeId,
  setSelectedThemeId,
  themeOverrides,
  onSaveOverride,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'mentions' | 'confidence' | 'opportunity'>('opportunity');
  const [viewMode, setViewMode] = useState<'list' | 'category'>('list');

  // Categories extraction
  const categories = Array.from(new Set(themes.map((t) => t.category)));

  // Filter and Sort Themes
  const filteredThemes = themes
    .filter((theme) => {
      const matchesSearch = theme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            theme.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            theme.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSeverity = selectedSeverity.length === 0 || selectedSeverity.includes(theme.severity);
      const matchesCategory = selectedCategory.length === 0 || selectedCategory.includes(theme.category);
      
      return matchesSearch && matchesSeverity && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'mentions') return b.mentionCount - a.mentionCount;
      if (sortBy === 'confidence') return b.confidenceScore - a.confidenceScore;
      return b.opportunityScore - a.opportunityScore;
    });

  // Group by category helper
  const getThemesByCategory = () => {
    const grouped: Record<string, ProblemTheme[]> = {};
    filteredThemes.forEach((theme) => {
      if (!grouped[theme.category]) {
        grouped[theme.category] = [];
      }
      grouped[theme.category].push(theme);
    });
    return grouped;
  };

  const renderThemeCard = (theme: ProblemTheme) => {
    const isChecked = checkedThemeIds.includes(theme.id);
    const hasOverride = !!themeOverrides[theme.id];
    const activeRec = hasOverride
      ? themeOverrides[theme.id].recommendation
      : theme.opportunityScore >= 80
      ? 'Build'
      : theme.opportunityScore >= 40
      ? 'Validate'
      : 'Ignore';

    return (
      <div key={theme.id} className="theme-card">
        <div className="card-header">
          <div
            className="card-header-left"
            onClick={() => setSelectedThemeId(theme.id)}
          >
            <span className="card-category">{theme.category}</span>
            <div className="card-title-row">
              <span className="card-title">{theme.title}</span>
              <span className={`badge ${theme.severity === 'High' ? 'badge-high' : theme.severity === 'Medium' ? 'badge-medium' : 'badge-low'}`}>
                {theme.severity} Severity
              </span>
              <span className={`badge ${activeRec === 'Build' ? 'badge-indigo' : activeRec === 'Validate' ? 'badge-violet' : 'badge-slate'}`}>
                {hasOverride ? `PM: ${activeRec}` : `AI: ${activeRec}`}
              </span>
            </div>
            <p className="card-summary">{theme.summary}</p>
            
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
              {theme.platforms.map((p) => (
                <span key={p} className="badge badge-platform">{p}</span>
              ))}
              <span className="badge badge-slate" style={{ fontSize: '11px' }}>Bias: {theme.biasRisk}</span>
              <span className="badge badge-slate" style={{ fontSize: '11px' }}>Confidence: {theme.confidenceScore}%</span>
            </div>
          </div>

          <div className="card-header-right">
            <div style={{ textAlign: 'right', minWidth: '70px' }}>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-dark)' }}>{theme.mentionCount}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Mentions</div>
            </div>
            <div style={{ textAlign: 'right', minWidth: '70px' }}>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--primary)' }}>{theme.opportunityScore}%</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Opp Score</div>
            </div>
            
            {/* Compare checkbox */}
            <div
              style={{ display: 'flex', alignItems: 'center', paddingLeft: '8px', borderLeft: '1px solid var(--border)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', gap: '4px' }}>
                <input
                  type="checkbox"
                  className="filter-checkbox"
                  checked={isChecked}
                  disabled={!isChecked && checkedThemeIds.length >= 2}
                  onChange={() => toggleCompareTheme(theme.id)}
                  id={`compare-check-${theme.id}`}
                />
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Compare</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleSeverityToggle = (sev: string) => {
    setSelectedSeverity((prev) =>
      prev.includes(sev) ? prev.filter((s) => s !== sev) : [...prev, sev]
    );
  };

  const handleCategoryToggle = (cat: string) => {
    setSelectedCategory((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // If a theme is selected, show its deep detail view
  if (selectedThemeId) {
    const selectedTheme = themes.find((t) => t.id === selectedThemeId);
    if (selectedTheme) {
      return (
        <ThemeDetail
          theme={selectedTheme}
          onBack={() => setSelectedThemeId(null)}
          override={themeOverrides[selectedTheme.id]}
          onSaveOverride={(rec, reason) => onSaveOverride(selectedTheme.id, rec, reason)}
        />
      );
    }
  }

  return (
    <div>
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>Competitor Problem Themes</h1>
          <p className="dashboard-subtitle">
            Recurring complaint themes clustered from customer reviews. Select up to two to compare.
          </p>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Left Filters Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-widget">
            <span className="widget-title"><Search style={{ width: '16px', height: '16px' }} /> Search Themes</span>
            <input
              type="text"
              className="sort-select"
              placeholder="Search by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ fontSize: '13px' }}
            />
          </div>

          <div className="sidebar-widget">
            <span className="widget-title"><ArrowUpDown style={{ width: '16px', height: '16px' }} /> Sort By</span>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'mentions' | 'confidence' | 'opportunity')}
            >
              <option value="opportunity">Opportunity Score (Highest)</option>
              <option value="mentions">Mention Count (Highest)</option>
              <option value="confidence">Confidence Score (Highest)</option>
            </select>
          </div>

          <div className="sidebar-widget">
            <span className="widget-title"><SlidersHorizontal style={{ width: '16px', height: '16px' }} /> Severity</span>
            <div className="filter-group">
              {['High', 'Medium', 'Low'].map((sev) => (
                <label key={sev} className="filter-option">
                  <input
                    type="checkbox"
                    className="filter-checkbox"
                    checked={selectedSeverity.includes(sev)}
                    onChange={() => handleSeverityToggle(sev)}
                  />
                  <span>{sev}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="sidebar-widget">
            <span className="widget-title"><SlidersHorizontal style={{ width: '16px', height: '16px' }} /> Categories</span>
            <div className="filter-group">
              {categories.map((cat) => (
                <label key={cat} className="filter-option">
                  <input
                    type="checkbox"
                    className="filter-checkbox"
                    checked={selectedCategory.includes(cat)}
                    onChange={() => handleCategoryToggle(cat)}
                  />
                  <span style={{ fontSize: '13px' }}>{cat}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Main Content (Themes stack) */}
        <div>
          {/* View Mode Swapper Toggle Buttons */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            <button
              className={`btn-secondary ${viewMode === 'list' ? 'active' : ''}`}
              style={{ padding: '8px 16px', fontSize: '13px', fontWeight: 600, borderBottom: viewMode === 'list' ? '2.5px solid var(--primary)' : '1px solid var(--border)' }}
              onClick={() => setViewMode('list')}
            >
              Flat Themes List
            </button>
            <button
              className={`btn-secondary ${viewMode === 'category' ? 'active' : ''}`}
              style={{ padding: '8px 16px', fontSize: '13px', fontWeight: 600, borderBottom: viewMode === 'category' ? '2.5px solid var(--primary)' : '1px solid var(--border)' }}
              onClick={() => setViewMode('category')}
              id="group-by-category-btn"
            >
              Group By Category Importance
            </button>
          </div>

          {filteredThemes.length === 0 ? (
            <div className="analyzer-card" style={{ textAlign: 'center', padding: '48px' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
                No themes match your active filter criteria. Try clearing search or checkboxes.
              </p>
            </div>
          ) : viewMode === 'list' ? (
            <div className="themes-stack">
              {filteredThemes.map(renderThemeCard)}
            </div>
          ) : (
            <div>
              {Object.entries(getThemesByCategory())
                .sort((a, b) => {
                  const aMentions = a[1].reduce((sum, t) => sum + t.mentionCount, 0);
                  const bMentions = b[1].reduce((sum, t) => sum + t.mentionCount, 0);
                  return bMentions - aMentions;
                })
                .map(([category, categoryThemes]) => {
                  const totalMentions = categoryThemes.reduce((sum, t) => sum + t.mentionCount, 0);
                  const maxOppScore = Math.max(...categoryThemes.map((t) => t.opportunityScore));
                  return (
                    <div key={category} style={{ marginBottom: '28px' }}>
                      <h3 style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: 'var(--primary)',
                        marginBottom: '12px',
                        borderBottom: '1px solid var(--border)',
                        paddingBottom: '6px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '8px'
                      }}>
                        <span>{category} ({categoryThemes.length} {categoryThemes.length === 1 ? 'Theme' : 'Themes'})</span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'none' }}>
                          Total Mentions: <strong style={{ color: 'var(--text-dark)' }}>{totalMentions}</strong> | Max Opportunity: <strong style={{ color: 'var(--primary)' }}>{maxOppScore}%</strong>
                        </span>
                      </h3>
                      <div className="themes-stack">
                        {categoryThemes.map(renderThemeCard)}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
