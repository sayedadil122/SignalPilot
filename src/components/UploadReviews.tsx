import React, { useState, useRef } from 'react';
import { Upload, FileUp, CheckCircle2, FileJson } from 'lucide-react';
import type { PlatformType } from '../types';

interface UploadReviewsProps {
  onAnalyze: (fileName: string, platform: PlatformType | 'Auto Detect') => void;
}

type ReviewSourceType = PlatformType | 'Internal';

export const UploadReviews: React.FC<UploadReviewsProps> = ({ onAnalyze }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sourceType, setSourceType] = useState<ReviewSourceType>('Internal');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUseSample = () => {
    const sampleFile = new File(["sample data"], "internal_slack_feedback_export.csv", { type: "text/csv" });
    setSelectedFile(sampleFile);
    setSourceType('Internal');
  };

  const handleAnalyzeClick = () => {
    if (!selectedFile) {
      alert('Please upload a file first.');
      return;
    }
    // Simulate reading the file and triggering analysis using mock engine
    onAnalyze(selectedFile.name, sourceType === 'Internal' ? 'Auto Detect' : sourceType);
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <div className="dashboard-header" style={{ marginBottom: '24px' }}>
        <div className="dashboard-title-group">
          <h1>Upload Reviews / CSV</h1>
          <p className="dashboard-subtitle">
            Import bulk data from Zendesk, Intercom, Dovetail, or standard CSV exports.
          </p>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '8px' }}>
            Data Source (Optional)
          </label>
          <select 
            value={sourceType} 
            onChange={(e) => setSourceType(e.target.value as ReviewSourceType)}
            className="sort-select" 
            style={{ width: '100%', maxWidth: '300px' }}
          >
            <option value="Internal">Internal (Zendesk, Intercom, Custom CSV)</option>
            <option value="G2">G2 Reviews CSV</option>
            <option value="Capterra">Capterra Reviews CSV</option>
          </select>
        </div>

        <div 
          style={{
            border: `2px dashed ${isDragging ? 'var(--primary)' : '#cbd5e1'}`,
            borderRadius: '12px',
            padding: '48px 24px',
            textAlign: 'center',
            backgroundColor: isDragging ? 'rgba(79, 70, 229, 0.04)' : '#f8fafc',
            cursor: 'pointer',
            marginBottom: '24px',
            transition: 'all 0.2s ease'
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            style={{ display: 'none' }} 
            accept=".csv,.txt,.json"
          />
          
          {selectedFile ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <CheckCircle2 style={{ width: '24px', height: '24px' }} />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '4px' }}>File Ready for Analysis</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{selectedFile.name}</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#f1f5f9', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Upload style={{ width: '24px', height: '24px' }} />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '4px' }}>Click to upload or drag and drop</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>CSV, TXT, or JSON (max. 10MB)</p>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={handleUseSample} style={{
            background: 'none', border: 'none', color: 'var(--primary)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            <FileJson style={{ width: '16px', height: '16px' }} />
            Use Sample File (internal_slack.csv)
          </button>
          
          <button className="btn-primary" onClick={handleAnalyzeClick} disabled={!selectedFile} style={{ opacity: selectedFile ? 1 : 0.6 }}>
            <FileUp style={{ width: '16px', height: '16px' }} />
            Analyze Uploaded Reviews
          </button>
        </div>
      </div>
    </div>
  );
};
