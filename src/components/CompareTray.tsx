import React from 'react';
import { X, ArrowRightLeft } from 'lucide-react';
import type { ProblemTheme } from '../types';

interface CompareTrayProps {
  checkedThemeIds: string[];
  themes: ProblemTheme[];
  onClear: () => void;
  onCompare: () => void;
  onRemoveTheme: (id: string) => void;
}

export const CompareTray: React.FC<CompareTrayProps> = ({
  checkedThemeIds,
  themes,
  onClear,
  onCompare,
  onRemoveTheme,
}) => {
  if (checkedThemeIds.length === 0) return null;

  const selectedThemes = checkedThemeIds
    .map((id) => themes.find((t) => t.id === id))
    .filter(Boolean) as ProblemTheme[];

  return (
    <div className="compare-tray">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <ArrowRightLeft style={{ width: '16px', height: '16px', color: 'var(--primary-light)' }} />
        <span className="compare-tray-text">
          Comparing <strong>{checkedThemeIds.length}</strong> of 2 themes
        </span>
      </div>

      <div className="compare-tray-chips">
        {selectedThemes.map((theme) => (
          <div key={theme.id} className="compare-tray-chip">
            <span>{theme.title.length > 20 ? `${theme.title.substring(0, 18)}...` : theme.title}</span>
            <button
              className="compare-tray-chip-remove"
              onClick={() => onRemoveTheme(theme.id)}
              title="Remove theme"
            >
              <X style={{ width: '10px', height: '10px' }} />
            </button>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          className="btn-secondary"
          style={{ padding: '6px 12px', fontSize: '12px', background: 'transparent', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}
          onClick={onClear}
        >
          Clear
        </button>
        <button
          className="btn-primary"
          style={{ padding: '6px 16px', fontSize: '12px', backgroundColor: 'white', color: 'var(--text-dark)', boxShadow: 'none' }}
          disabled={checkedThemeIds.length !== 2}
          onClick={onCompare}
          id="trigger-compare-btn"
        >
          Compare Themes
        </button>
      </div>
    </div>
  );
};
