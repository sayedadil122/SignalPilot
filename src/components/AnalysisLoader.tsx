import React, { useEffect, useState } from 'react';

interface AnalysisLoaderProps {
  onComplete: () => void;
}

export const AnalysisLoader: React.FC<AnalysisLoaderProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    'Detecting feedback source…',
    'Extracting complaints and praise…',
    'Removing duplicates…',
    'Clustering user pain themes…',
    'Checking bias risk…',
    'Calculating confidence…',
    'Finding competitor gaps…',
    'Generating product opportunities…',
    'Creating evidence packs…',
  ];

  useEffect(() => {
    if (currentStep < steps.length) {
      const delay = currentStep === 0 ? 300 : 400; // Fast initial detect, then standard pacing
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => {
        onComplete();
      }, 300);
      return () => clearTimeout(finalTimer);
    }
  }, [currentStep, onComplete, steps.length]);

  return (
    <div className="loader-container">
      <div className="pulse-spinner"></div>
      <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '8px' }}>
        Analyzing Reviews
      </h2>
      <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '32px' }}>
        Extracting signals from public competitor feeds
      </p>

      <div className="loader-steps">
        {steps.map((step, idx) => {
          let statusClass = '';
          if (idx < currentStep) statusClass = 'completed';
          else if (idx === currentStep) statusClass = 'active';

          return (
            <div key={idx} className={`loader-step ${statusClass}`}>
              <div className="step-bullet">
                {idx < currentStep ? '✓' : idx + 1}
              </div>
              <span>{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
