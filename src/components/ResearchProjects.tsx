import type { SavedProject } from '../types';
import { FolderOpen, PlayCircle, BarChart2, Clock } from 'lucide-react';

interface ResearchProjectsProps {
  projects: SavedProject[];
  onRestore: (project: SavedProject) => void;
  setActiveTab: (tab: string) => void;
}

type DemoProject = Omit<SavedProject, 'result'> & { isDemo: true };
type ProjectListItem = SavedProject | DemoProject;

// Static demo projects shown if fewer than 3 projects exist
const DEMO_PROJECTS: DemoProject[] = [
  {
    id: 'demo_dovetail',
    projectName: 'Dovetail Review Analysis',
    platform: 'G2' as const,
    url: 'https://www.g2.com/products/dovetail/reviews',
    reviewsCount: 52,
    topComplaint: 'Tag Bloat At Scale',
    lastAnalyzedDate: '2026-06-19',
    isDemo: true,
  },
  {
    id: 'demo_swiggy_watch',
    projectName: 'Swiggy Weekly Review Watch',
    platform: 'Play Store' as const,
    url: 'https://play.google.com/store/apps/details?id=in.swiggy.android',
    reviewsCount: 314,
    topComplaint: 'Ghost Orders & Refund Delays',
    lastAnalyzedDate: '2026-06-22',
    isDemo: true,
  },
  {
    id: 'demo_internal',
    projectName: 'Internal Support Ticket Analysis',
    platform: 'Custom Website' as const,
    url: 'Internal — Zendesk export Q2 2026',
    reviewsCount: 187,
    topComplaint: 'Invoice & Billing Report Failures',
    lastAnalyzedDate: '2026-06-18',
    isDemo: true,
  },
];

export const ResearchProjects: React.FC<ResearchProjectsProps> = ({
  projects,
  onRestore,
  setActiveTab,
}) => {
  const handleRestore = (project: SavedProject) => {
    onRestore(project);
    setActiveTab('dashboard');
  };

  // Merge real projects with demo stubs so we always show at least 5 entries
  const realIds = new Set(projects.map((p) => p.id));
  const additionalDemos = DEMO_PROJECTS.filter((d) => !realIds.has(d.id));
  const allProjects: ProjectListItem[] = [...projects, ...additionalDemos];

  const platformColor = (platform: string) => {
    if (platform === 'G2') return '#4f46e5';
    if (platform === 'Capterra') return '#059669';
    if (platform === 'Reddit') return '#d97706';
    if (platform === 'Play Store' || platform === 'App Store') return '#0d9488';
    return '#64748b';
  };

  return (
    <div>
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>Research Projects</h1>
          <p className="dashboard-subtitle">
            Browse and restore previous competitor review intelligence runs. Each project preserves full analysis state.
          </p>
        </div>
        <span className="badge badge-primary">{allProjects.length} Projects</span>
      </div>

      <div className="projects-grid">
        {allProjects.map((project) => {
          const isDemo = 'isDemo' in project && project.isDemo;
          const isRealProject = !isDemo && projects.some((p) => p.id === project.id);

          return (
            <div key={project.id} className="project-card" style={{ position: 'relative', opacity: isDemo ? 0.8 : 1 }}>
              {isDemo && (
                <div style={{
                  position: 'absolute', top: '12px', right: '12px',
                  background: '#f1f5f9', color: '#64748b',
                  fontSize: '10px', fontWeight: 700, padding: '2px 6px',
                  borderRadius: '4px', textTransform: 'uppercase'
                }}>
                  Demo
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <h3 className="project-title" style={{ paddingRight: isDemo ? '48px' : 0 }}>{project.projectName}</h3>
              </div>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                <span className="badge" style={{ background: platformColor(project.platform) + '20', color: platformColor(project.platform), fontSize: '11px' }}>
                  {project.platform}
                </span>
              </div>

              <div className="project-details">
                <div className="project-detail-row">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <BarChart2 style={{ width: '12px', height: '12px' }} /> Reviews
                  </span>
                  <span className="project-detail-val">{project.reviewsCount}</span>
                </div>
                <div className="project-detail-row">
                  <span>Top Issue</span>
                  <span className="project-detail-val" style={{ maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={project.topComplaint}>
                    {project.topComplaint}
                  </span>
                </div>
                <div className="project-detail-row" style={{ marginTop: '4px', borderTop: '1px dashed var(--border)', paddingTop: '6px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock style={{ width: '12px', height: '12px' }} /> Last Run
                  </span>
                  <span className="project-detail-val">{project.lastAnalyzedDate}</span>
                </div>
              </div>

              <div className="project-actions" style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="btn-primary"
                  style={{ flex: 1, fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', opacity: isDemo ? 0.7 : 1 }}
                  onClick={() => !isDemo && isRealProject ? handleRestore(project as SavedProject) : null}
                  disabled={isDemo}
                  title={isDemo ? 'Demo project — run a real analysis to restore' : 'Restore this session'}
                  id={`restore-project-btn-${project.id}`}
                >
                  <PlayCircle style={{ width: '15px', height: '15px' }} />
                  {isDemo ? 'Demo Only' : 'Restore Session'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {allProjects.length === 0 && (
        <div className="analyzer-card" style={{ textAlign: 'center', padding: '64px 32px' }}>
          <FolderOpen style={{ width: '48px', height: '48px', color: 'var(--text-muted)', margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '8px' }}>No saved projects yet</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '380px', margin: '0 auto 24px' }}>
            Run an analysis on a competitor URL, paste feedback, or upload a CSV — your results will appear here.
          </p>
          <button className="btn-primary" onClick={() => setActiveTab('home')}>Start a New Analysis</button>
        </div>
      )}
    </div>
  );
};
