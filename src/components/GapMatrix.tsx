import React from 'react';
import type { CompetitorGapRow } from '../types';
import { TrendingUp } from 'lucide-react';

interface GapMatrixProps {
  matrixData: CompetitorGapRow[];
  companyName?: string;
}

export const GapMatrix: React.FC<GapMatrixProps> = ({ matrixData, companyName }) => {
  const isZomato = companyName === 'Zomato';
  const opportunityLabel = isZomato ? 'Opportunity for Zomato' : 'SignalPilot Opportunity';

  return (
    <div>
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>Competitor Gap Matrix</h1>
          <p className="dashboard-subtitle">
            {isZomato
              ? 'Comparing Zomato against Swiggy, Zepto, and Blinkit on key dimensions.'
              : 'Analyzing Productboard, Canny, Dovetail, Aha!, JPD, ProductPlan, and Enterpret — 7 competitors, one view.'}
          </p>
        </div>
        <div>
          <span className="badge badge-primary">{matrixData.length} Competitors Analyzed</span>
        </div>
      </div>

      <div className="matrix-container">
        <table className="matrix-table" id="gap-matrix-table">
          <thead>
            <tr>
              <th style={{ minWidth: '140px' }}>Competitor</th>
              <th>What Users Like ✓</th>
              <th>Common Complaints ✗</th>
              <th>Missing Capability</th>
              <th className="highlight-col-head">{opportunityLabel} ⚡</th>
            </tr>
          </thead>
          <tbody>
            {matrixData.map((row, idx) => (
              <tr key={idx}>
                <td>
                  <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontSize: '14px' }}>{row.competitorName}</div>
                </td>
                <td>
                  <div style={{ color: '#059669', fontSize: '13px' }}>{row.whatUsersLike}</div>
                </td>
                <td>
                  <div style={{ color: '#dc2626', fontSize: '13px' }}>{row.commonComplaints}</div>
                </td>
                <td>
                  <div style={{ color: '#d97706', fontSize: '13px', fontStyle: 'italic' }}>{row.missingCapability}</div>
                </td>
                <td className="highlight-col">
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>{row.signalPilotOpportunity}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="differentiation-box" style={{ marginTop: '32px' }}>
        <div className="diff-icon-container">
          <TrendingUp style={{ width: '22px', height: '22px' }} />
        </div>
        <div>
          <div className="diff-title">Strategic Insight Summary</div>
          <p className="diff-text">
            {isZomato
              ? 'By comparing Zomato with Swiggy, Zepto, and Blinkit, we identify where competitor platforms are winning and highlight critical areas like checkout payments and peak-hour delivery latency where Zomato can improve its in-house customer experience.'
              : 'While legacy repositories (Productboard, Canny, Dovetail, Aha!, JPD, ProductPlan, Enterpret) successfully collect and house user-submitted ideas, they remain dependent on PMs manually reading comments to extract core pain points. SignalPilot acts as the "final mile" synthesis engine — converting public review signals directly into roadmap-ready evidence packs with bias detection and confidence scoring.'}
          </p>
        </div>
      </div>
    </div>
  );
};
