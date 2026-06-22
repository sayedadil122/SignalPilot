import React, { useState } from 'react';
import type { CrawlSchedule, PlatformType } from '../types';
import { Play, Pause, Trash2, Plus, Eye, Save } from 'lucide-react';
import { toast } from 'sonner';

interface ScheduleCrawlsProps {
  schedules: CrawlSchedule[];
  onSaveSchedule: (schedule: CrawlSchedule) => void;
  onDeleteSchedule: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onRunNow: (schedule: CrawlSchedule) => void;
  onPreviewReport: () => void;
}

export const ScheduleCrawls: React.FC<ScheduleCrawlsProps> = ({
  schedules,
  onSaveSchedule,
  onDeleteSchedule,
  onToggleStatus,
  onRunNow,
  onPreviewReport,
}) => {
  const [name, setName] = useState('');
  const [targetProduct, setTargetProduct] = useState('');
  const [competitors, setCompetitors] = useState('');
  const [platforms, setPlatforms] = useState<PlatformType[]>(['Play Store']);
  const [frequency, setFrequency] = useState<'Hourly' | 'Daily' | 'Weekly'>('Daily');
  const [deliveryChannel, setDeliveryChannel] = useState<'Email' | 'Slack' | 'In-app'>('Email');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [reportType, setReportType] = useState('Executive Summary');
  const [deduplicationEnabled] = useState(true);

  const availablePlatforms: PlatformType[] = [
    'Play Store', 'App Store', 'Reddit', 'Survey Forms', 'Custom Website', 'Capterra', 'G2', 'Product Hunt'
  ];

  const handlePlatformChange = (plat: PlatformType) => {
    setPlatforms((prev) =>
      prev.includes(plat) ? prev.filter((p) => p !== plat) : [...prev, plat]
    );
  };

  const handleCreateMonitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { toast.error('Please enter a monitor name.'); return; }
    if (!targetProduct.trim()) { toast.error('Please enter a target product.'); return; }
    if (platforms.length === 0) { toast.error('Please select at least one source.'); return; }

    const newSchedule: CrawlSchedule = {
      id: `sched_${Date.now()}`,
      projectName: name,
      url: targetProduct,
      platforms,
      frequency,
      deduplicationEnabled,
      status: 'Active',
      lastRun: 'Never',
      nextRun: frequency === 'Hourly' ? 'In 60 mins' : frequency === 'Daily' ? 'Tomorrow at 12:00 AM' : 'In 7 days',
      targetProduct,
      competitors: competitors.split(',').map(c => c.trim()),
      deliveryChannel,
      recipientEmail,
      reportType,
    };

    onSaveSchedule(newSchedule);
    setName('');
    setTargetProduct('');
    setCompetitors('');
    toast.success(`Monitor "${name}" created successfully!`);
  };

  const handleSaveDraft = () => {
    toast.success(`Draft monitor "${name || 'Untitled'}" saved.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>Schedule recurring insight reports</h1>
          <p className="dashboard-subtitle">
            Set it once. SignalPilot continuously watches competitor reviews, public feeds, and internal channels to email you actionable weekly summaries.
          </p>
        </div>
      </div>

      <div className="dashboard-grid" style={{ gridTemplateColumns: '400px 1fr' }}>
        {/* Left Side: Create form */}
        <aside className="dashboard-sidebar" style={{ gap: '20px' }}>
          <div className="sidebar-widget">
            <span className="widget-title"><Plus style={{ width: '16px', height: '16px' }} /> Configure New Monitor</span>
            <form onSubmit={handleCreateMonitor} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-dark)' }}>Monitor Name</label>
                <input type="text" className="sort-select" placeholder="e.g. Swiggy Weekly Review Watch" value={name} onChange={(e) => setName(e.target.value)} style={{ fontSize: '13px' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-dark)' }}>Product to Monitor</label>
                <input type="text" className="sort-select" placeholder="e.g. Swiggy App" value={targetProduct} onChange={(e) => setTargetProduct(e.target.value)} style={{ fontSize: '13px' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-dark)' }}>Competitors to track (comma separated)</label>
                <input type="text" className="sort-select" placeholder="e.g. Zomato, Eats" value={competitors} onChange={(e) => setCompetitors(e.target.value)} style={{ fontSize: '13px' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-dark)' }}>Sources</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', maxHeight: '120px', overflowY: 'auto', padding: '4px' }}>
                  {availablePlatforms.map((plat) => (
                    <label key={plat} className="filter-option" style={{ fontSize: '12px' }}>
                      <input type="checkbox" className="filter-checkbox" checked={platforms.includes(plat)} onChange={() => handlePlatformChange(plat)} />
                      <span>{plat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-dark)' }}>Frequency</label>
                  <select className="sort-select" value={frequency} onChange={(e) => setFrequency(e.target.value as 'Hourly' | 'Daily' | 'Weekly')} style={{ fontSize: '13px' }}>
                    <option value="Hourly">Hourly</option><option value="Daily">Daily</option><option value="Weekly">Weekly</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-dark)' }}>Delivery Channel</label>
                  <select className="sort-select" value={deliveryChannel} onChange={(e) => setDeliveryChannel(e.target.value as 'Email' | 'Slack' | 'In-app')} style={{ fontSize: '13px' }}>
                    <option value="Email">Email</option><option value="Slack">Slack</option><option value="In-app">In-app Only</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-dark)' }}>Recipient Email</label>
                <input type="email" className="sort-select" placeholder="pm@company.com" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} style={{ fontSize: '13px' }} disabled={deliveryChannel !== 'Email'} />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-dark)' }}>Report Type</label>
                <select className="sort-select" value={reportType} onChange={(e) => setReportType(e.target.value)} style={{ fontSize: '13px' }}>
                  <option value="Executive Summary">Executive Summary</option>
                  <option value="Deep Dive">Deep Dive Matrix</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1, fontSize: '13px', padding: '10px' }}>
                  Create Monitor
                </button>
                <button type="button" className="btn-secondary" onClick={handleSaveDraft} style={{ fontSize: '13px', padding: '10px' }}>
                  <Save style={{ width: '14px', height: '14px' }} />
                </button>
              </div>
              <button type="button" onClick={onPreviewReport} className="btn-secondary" style={{ width: '100%', fontSize: '13px', padding: '10px', marginTop: '4px' }}>
                <Eye style={{ width: '16px', height: '16px', marginRight: '6px' }} />
                Preview Weekly Report
              </button>
            </form>
          </div>
        </aside>

        {/* Right Side: Table of schedules */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-dark)' }}>Active Monitors</h2>
          
          {schedules.length === 0 ? (
            <div className="analyzer-card" style={{ textAlign: 'center', padding: '48px' }}>
              <p style={{ color: 'var(--text-muted)' }}>No monitors configured yet.</p>
            </div>
          ) : (
            <div className="matrix-container" style={{ width: '100%' }}>
              <table className="matrix-table">
                <thead>
                  <tr>
                    <th>Monitor Name</th>
                    <th>Sources</th>
                    <th>Frequency</th>
                    <th>Status</th>
                    <th>Last / Next Run</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.map((sched) => (
                    <tr key={sched.id}>
                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{sched.projectName}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{sched.url}</div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                          {sched.platforms.map((p) => (
                            <span key={p} className="badge badge-platform" style={{ fontSize: '10px' }}>{p}</span>
                          ))}
                        </div>
                      </td>
                      <td><span className="badge badge-slate">{sched.frequency}</span></td>
                      <td>
                        <span className={`badge ${sched.status === 'Active' ? 'badge-low' : 'badge-slate'}`}>
                          {sched.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontSize: '12px', color: 'var(--text-dark)' }}>L: {sched.lastRun}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>N: {sched.nextRun}</div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button className="btn-secondary" style={{ padding: '6px', borderRadius: '4px' }} onClick={() => onToggleStatus(sched.id)} title={sched.status === 'Active' ? 'Pause' : 'Resume'}>
                            {sched.status === 'Active' ? <Pause style={{ width: '12px', height: '12px' }} /> : <Play style={{ width: '12px', height: '12px' }} />}
                          </button>
                          <button className="btn-secondary" style={{ padding: '6px', borderRadius: '4px' }} onClick={() => onRunNow(sched)} title="Run now">
                            <Play style={{ width: '12px', height: '12px', color: 'var(--success)' }} />
                          </button>
                          <button className="btn-secondary" style={{ padding: '6px', borderRadius: '4px', borderColor: 'rgba(220, 38, 38, 0.2)' }} onClick={() => onDeleteSchedule(sched.id)} title="Delete">
                            <Trash2 style={{ width: '12px', height: '12px', color: 'var(--danger)' }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
