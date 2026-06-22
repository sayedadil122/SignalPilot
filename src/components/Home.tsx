import React from 'react';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clipboard,
  ClipboardCheck,
  Clock,
  FileText,
  Layers,
  Route,
  Search,
  ShieldAlert,
  Upload,
} from 'lucide-react';

interface HomeProps {
  setActiveTab: (tab: string) => void;
  onTrySampleProject: () => void;
}

const inputCards = [
  {
    title: 'Analyze by URL',
    copy: 'Analyze reviews, Reddit threads, app store comments, and competitor pages.',
    action: 'Analyze URL',
    tab: 'analyzer',
    icon: Search,
  },
  {
    title: 'Paste Feedback',
    copy: 'Paste notes, tickets, interview snippets, or review comments.',
    action: 'Paste feedback',
    tab: 'paste',
    icon: Clipboard,
  },
  {
    title: 'Upload Reviews / CSV',
    copy: 'Upload CSV, JSON, TXT, review exports, or support data.',
    action: 'Upload data',
    tab: 'upload',
    icon: Upload,
  },
  {
    title: 'Schedule Monitor',
    copy: 'Schedule recurring market scans and receive weekly insight reports.',
    action: 'Create monitor',
    tab: 'monitor',
    icon: Clock,
  },
];

const flowSteps = [
  { label: 'Input signals', icon: Search },
  { label: 'Expressed pain', icon: FileText },
  { label: 'Deeper hypothesis', icon: Layers },
  { label: 'Bias check', icon: ShieldAlert },
  { label: 'Evidence pack', icon: ClipboardCheck },
  { label: 'PM action', icon: Route },
];

const depthCards = [
  ['Expressed Pain', 'What users are explicitly saying in reviews, notes, and tickets.'],
  ['Possible Deeper Pain', 'The underlying workflow, trust, or adoption issue to investigate.'],
  ['Evidence Strength', 'How much support the pattern has across sources and segments.'],
  ['Bias Risk', 'Whether a vocal source may be overstating the priority.'],
  ['Validation Needed', 'The next research or data question before committing roadmap capacity.'],
  ['Recommended PM Action', 'Build, validate, ignore, or attach to a roadmap item.'],
];

export const Home: React.FC<HomeProps> = ({ setActiveTab, onTrySampleProject }) => {
  return (
    <div className="home-page">
      <section className="home-hero">
        <span className="eyebrow">Product Discovery Intelligence</span>
        <h1>Turn messy signals into product decisions your team can trust</h1>
        <p>
          SignalPilot helps PMs separate expressed pain from deeper hypotheses, bias risk,
          and validation-ready opportunities.
        </p>
        <button className="btn-primary" onClick={onTrySampleProject}>
          Try sample analysis
          <ArrowRight size={16} />
        </button>
      </section>

      <section className="decision-section">
        <div className="section-heading">
          <h2>What decision are you trying to make?</h2>
          <p>Choose the product question first. SignalPilot keeps the analysis anchored to a PM action.</p>
        </div>
        <div className="intent-chip-row">
          <button type="button" onClick={() => setActiveTab('analyzer')}>Find competitor gaps</button>
          <button type="button" onClick={() => setActiveTab('paste')}>Validate a product idea</button>
          <button type="button" onClick={() => setActiveTab('projects')}>Prioritize roadmap themes</button>
        </div>
      </section>

      <section className="input-card-grid" aria-label="Signal input options">
        {inputCards.map((card) => {
          const Icon = card.icon;
          return (
            <article className="input-card" key={card.title}>
              <div className="input-icon">
                <Icon size={22} />
              </div>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
              <button className="text-action" type="button" onClick={() => setActiveTab(card.tab)}>
                {card.action}
                <ArrowRight size={15} />
              </button>
            </article>
          );
        })}
      </section>

      <section className="flow-section">
        <div className="section-heading">
          <h2>From signal intake to PM action</h2>
          <p>Every analysis is organized as a decision workflow, not a generic summary.</p>
        </div>
        <div className="flow-track">
          {flowSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.label}>
                <div className="flow-step">
                  <Icon size={18} />
                  <span>{step.label}</span>
                </div>
                {index < flowSteps.length - 1 && <ArrowRight className="flow-arrow" size={16} />}
              </React.Fragment>
            );
          })}
        </div>
      </section>

      <section className="pain-depth-section">
        <div className="section-heading">
          <h2>Pain Depth Analysis</h2>
          <p>
            Surface-level feedback is not always the real user need. SignalPilot separates what
            users say from what needs validation.
          </p>
        </div>
        <div className="pain-depth-grid">
          {depthCards.map(([title, copy], index) => (
            <article className="depth-card" key={title}>
              <div className="depth-index">{String(index + 1).padStart(2, '0')}</div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-note">
        <CheckCircle2 size={18} />
        <p>
          Built for evidence-backed hypotheses, bias-aware prioritization, and product review conversations.
        </p>
        <BarChart3 size={18} />
      </section>
    </div>
  );
};
