// client/src/pages/Recommendation.js
import React from 'react';
import Sidebar from '../layout/Sidebar'; // Import your Sidebar component
import { recommendationsData } from '../data/recommendationsData'; // Import data
import './Recommendation.css';

const Recommendation = () => {
  return (
    <div className="dashboard-layout">
      {/* 1. Sidebar remains fixed on the left */}
      <Sidebar />

      {/* 2. Main content area with proper padding */}
      <main className="recommendations-view">
        <header className="page-header">
          <div className="header-icon-container">✨</div>
          <div className="header-text-container">
            <h1>AI Recommendations</h1>
            <p>Personalized policy suggestions based on your profile</p>
          </div>
        </header>

        <section className="recommendations-list">
          {recommendationsData.map((policy, index) => (
            <div key={policy.id} className="recommendation-card-container">
              {/* Only show label for the first item */}
              {index === 0 && (
                <div className="top-recommendation-tag">
                  <span className="icon">📈</span> TOP RECOMMENDATION
                </div>
              )}

              <div className="card-inner-layout">
                <div className="card-top-section">
                  <div className="policy-meta">
                    <span className="category-pill">{policy.type}</span>
                    <h2 className="policy-name">{policy.title}</h2>
                    <p className="provider-name">{policy.provider}</p>
                  </div>
                  <div className="match-score-display">
                    <span className="score-value">{policy.match}%</span>
                    <span className="score-label">Match</span>
                  </div>
                </div>

                {/* Progress bar matching Figma green */}
                <div className="match-progress-track">
                  <div 
                    className="match-progress-bar" 
                    style={{ width: `${policy.match}%` }}
                  ></div>
                </div>

                <div className="recommendation-insight">
                  <span className="insight-label">Why we recommend this</span>
                  <p className="insight-body">{policy.reason}</p>
                </div>

                <div className="policy-metrics-grid">
                  <div className="metric">
                    <label>Coverage</label>
                    <p>{policy.coverage}</p>
                  </div>
                  <div className="metric">
                    <label>Premium</label>
                    <p>{policy.premium}</p>
                  </div>
                  <div className="metric">
                    <label>Claim Ratio</label>
                    <p className="success-text">{policy.claimRatio}</p>
                  </div>
                  <div className="metric">
                    <label>Risk Level</label>
                    <span className={`risk-status ${policy.riskLevel.toLowerCase().replace(' ', '-')}`}>
                      {policy.riskLevel}
                    </span>
                  </div>
                </div>

                <div className="benefits-tags">
                  {policy.tags.map((tag, i) => (
                    <span key={i} className="benefit-pill">{tag}</span>
                  ))}
                </div>

                <button className="primary-action-btn">Select Plan</button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Recommendation;