import React from 'react';
import {
  ArrowRight,
  BarChart3,
  ClipboardCheck,
  Clock,
  FileText,
  Layers,
  MessageSquare,
  Route,
  Search,
  ShieldAlert,
  Upload,
} from 'lucide-react';

interface PublicLandingProps {
  onLogin: () => void;
  onSignup: () => void;
  onTryDemo: () => void;
  onProtectedAction: () => void;
}

const productCards = [
  ['Analyze by URL', 'Review sites, Reddit threads, app stores, and competitor pages.', Search],
  ['Paste Feedback', 'Notes, tickets, interview snippets, and support comments.', MessageSquare],
  ['Upload Reviews / CSV', 'CSV, JSON, TXT, review exports, and support data.', Upload],
  ['Schedule Monitor', 'Recurring market scans and weekly insight reports.', Clock],
] as const;

const featureCards = [
  ['Evidence-backed hypotheses', 'Turn raw complaints into problem statements and validation questions.', FileText],
  ['Bias risk detection', 'Spot when loud channels or narrow segments may be distorting priority.', ShieldAlert],
  ['Decision-ready packs', 'Package quotes, context, and recommended PM action for review meetings.', ClipboardCheck],
] as const;

export const PublicLanding: React.FC<PublicLandingProps> = ({
  onLogin,
  onSignup,
  onTryDemo,
  onProtectedAction,
}) => {
  return (
    <main className="public-site">
      <header className="public-nav">
        <button className="public-brand" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span>SP</span>
          <strong>SignalPilot</strong>
        </button>
        <nav>
          <a href="#product">Product</a>
          <a href="#workflow">Workflow</a>
          <a href="#features">Features</a>
          <a href="#use-cases">Use Cases</a>
          <a href="#roadmap">Roadmap</a>
        </nav>
        <div className="public-nav-actions">
          <button className="btn-secondary compact-button" type="button" onClick={onLogin}>Login</button>
          <button className="btn-primary compact-button" type="button" onClick={onSignup}>Get Started</button>
        </div>
      </header>

      <section className="public-hero" id="product">
        <div className="public-hero-copy">
          <span className="eyebrow">Product Discovery Intelligence</span>
          <h1>Turn noisy feedback into confident product decisions</h1>
          <p>
            SignalPilot helps product teams analyze reviews, support tickets, competitor complaints,
            and market signals to find evidence quality, bias risk, and validation-ready opportunities.
          </p>
          <div className="public-cta-row">
            <button className="btn-primary" type="button" onClick={onTryDemo}>
              Try Demo
              <ArrowRight size={16} />
            </button>
            <button className="btn-secondary" type="button" onClick={onSignup}>Get Started</button>
            <button className="text-link" type="button" onClick={onLogin}>Already have an account? Login</button>
          </div>
        </div>

        <div className="public-preview-card" aria-label="Product preview">
          <div className="preview-topline">
            <span>PM decision workspace</span>
            <strong>84% confidence</strong>
          </div>
          <div className="preview-focus">
            <span>What needs validation</span>
            <h2>Enterprise users struggle to verify AI-generated summaries</h2>
            <p>Evidence is strong across G2 and interviews, but source bias requires validation with admin users.</p>
          </div>
          <div className="preview-metrics">
            <div><strong>126</strong><span>Signals</span></div>
            <div><strong>6</strong><span>Themes</span></div>
            <div><strong>Medium</strong><span>Bias risk</span></div>
          </div>
        </div>
      </section>

      <section className="public-section" id="workflow">
        <div className="section-heading">
          <h2>How it works</h2>
          <p>SignalPilot keeps every analysis grounded in a product decision, not a generic AI summary.</p>
        </div>
        <div className="flow-track public-flow">
          {[
            ['Input signals', Search],
            ['Expressed pain', FileText],
            ['Deeper hypothesis', Layers],
            ['Bias check', ShieldAlert],
            ['Evidence pack', ClipboardCheck],
            ['PM action', Route],
          ].map(([label, Icon], index) => (
            <React.Fragment key={label as string}>
              <div className="flow-step">
                {React.createElement(Icon)}
                <span>{label as string}</span>
              </div>
              {index < 5 && <ArrowRight className="flow-arrow" size={16} />}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="public-section" id="features">
        <div className="section-heading">
          <h2>Start from any signal source</h2>
          <p>Preview the product inputs. Creating real analyses is available after login or demo mode.</p>
        </div>
        <div className="input-card-grid">
          {productCards.map(([title, copy, Icon]) => (
            <article className="input-card" key={title}>
              <div className="input-icon"><Icon size={22} /></div>
              <h3>{title}</h3>
              <p>{copy}</p>
              <button className="text-action" type="button" onClick={onProtectedAction}>
                Open
                <ArrowRight size={15} />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="public-section" id="use-cases">
        <div className="section-heading">
          <h2>Built for PM decisions</h2>
          <p>Use SignalPilot when the team needs evidence, not just another dashboard.</p>
        </div>
        <div className="pain-depth-grid">
          {featureCards.map(([title, copy, Icon]) => (
            <article className="depth-card" key={title}>
              <div className="input-icon"><Icon size={20} /></div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="public-section roadmap-strip" id="roadmap">
        <BarChart3 size={18} />
        <div>
          <h2>Roadmap</h2>
          <p>Phase 1 focuses on demo analysis, saved projects, auth, and evidence-pack workflows. Live source integrations come next.</p>
        </div>
        <button className="btn-primary compact-button" type="button" onClick={onTryDemo}>Try Demo</button>
      </section>
    </main>
  );
};
