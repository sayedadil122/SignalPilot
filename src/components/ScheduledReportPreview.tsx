import React from 'react';
import { Mail, CheckCircle, AlertTriangle, Lightbulb, UserX, Target } from 'lucide-react';

interface ScheduledReportPreviewProps {
  onBack: () => void;
}

export const ScheduledReportPreview: React.FC<ScheduledReportPreviewProps> = ({ onBack }) => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '60px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-dark)' }}>Report Preview</h1>
        <button className="btn-secondary" onClick={onBack}>Back to Monitors</button>
      </div>

      <div style={{
        background: '#fff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}>
        {/* Email Header Simulation */}
        <div style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Mail style={{ width: '20px', height: '20px', color: 'var(--text-muted)' }} />
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-dark)' }}>Weekly Signal Report: Swiggy Review Analysis</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>From: SignalPilot Agent &lt;agent@signalpilot.io&gt;</div>
          </div>
        </div>

        {/* Email Body */}
        <div style={{ padding: '32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              SignalPilot Weekly Insight
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-dark)', margin: 0, lineHeight: 1.2 }}>
              Swiggy Competitor Watch
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '8px' }}>
              June 15 - June 22 • 1,245 new signals analyzed across App Store, Play Store, and Reddit.
            </p>
          </div>

          {/* Executive Summary */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: '8px', marginBottom: '16px' }}>Executive Summary</h3>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-dark)' }}>
              Swiggy's overall sentiment dropped by <strong>4%</strong> this week, driven heavily by an emerging spike in delivery delay complaints in Tier-2 cities. However, Zomato is currently experiencing a critical bug with their payment gateway (affecting UPI), presenting an immediate short-term acquisition opportunity.
            </p>
          </div>

          {/* Emerging Complaints */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#dc2626', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <AlertTriangle style={{ width: '18px', height: '18px' }} /> Emerging Risks (Swiggy)
            </h3>
            <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '16px', borderRadius: '0 8px 8px 0' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#991b1b', marginBottom: '4px' }}>Surge in "Ghost Orders"</div>
              <p style={{ fontSize: '13px', color: '#7f1d1d', margin: 0, marginBottom: '8px' }}>
                142 mentions (+315% WoW). Users report orders marked as delivered without receiving food. High churn risk.
              </p>
              <div style={{ fontSize: '12px', fontStyle: 'italic', color: '#991b1b', borderLeft: '2px solid #fca5a5', paddingLeft: '8px' }}>
                "Delivery guy never came but app says delivered. Support bot is useless. Uninstalling."
              </div>
            </div>
          </div>

          {/* Competitor Gaps */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Target style={{ width: '18px', height: '18px' }} /> Competitor Gaps (Zomato)
            </h3>
            <div style={{ background: '#e0e7ff', borderLeft: '4px solid var(--primary)', padding: '16px', borderRadius: '0 8px 8px 0' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#3730a3', marginBottom: '4px' }}>UPI Payment Gateway Failures</div>
              <p style={{ fontSize: '13px', color: '#312e81', margin: 0 }}>
                Zomato users are unable to complete UPI payments during peak hours. Swiggy should run a "Smooth Payments" push campaign immediately.
              </p>
            </div>
          </div>

          {/* Opportunities & Actions */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Lightbulb style={{ width: '18px', height: '18px' }} /> PM Recommended Actions
            </h3>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <CheckCircle style={{ width: '16px', height: '16px', color: 'var(--success)', marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)' }}>Investigate Ghost Orders</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Review logistics routing algorithm for Tier-2 cities; add delivery PIN verification for high-risk zones.</div>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <CheckCircle style={{ width: '16px', height: '16px', color: 'var(--success)', marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)' }}>Marketing Push (Zomato Gap)</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Run targeted ads highlighting Swiggy's 100% reliable payment success rate this weekend.</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Bias Warning */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '16px', background: '#fffbeb', borderRadius: '8px', border: '1px solid #fde68a' }}>
            <UserX style={{ width: '18px', height: '18px', color: '#d97706', marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#92400e', marginBottom: '4px' }}>AI Bias Warning</div>
              <div style={{ fontSize: '12px', color: '#b45309' }}>
                Reddit sample size for Zomato payment issues is heavily skewed towards iOS users. Verify with telemetry data before prioritizing platform-wide fixes.
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <button className="btn-primary" style={{ padding: '12px 24px' }}>Open Full Dashboard in SignalPilot</button>
          </div>
        </div>
      </div>
    </div>
  );
};
