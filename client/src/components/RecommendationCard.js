// client/src/components/RecommendationCard.js
import React from 'react';
import './RecommendationCard.css';

const RecommendationCard = ({ plan }) => {
  return (
    <div className="recommendation-card">
      <div className="card-header">
        <span className="category-tag">{plan.type}</span>
        <div className="match-score">
          <span className="match-value">{plan.match}%</span>
          <span className="match-label">Match</span>
        </div>
      </div>

      <div className="card-body">
        <h3 className="policy-title">{plan.title}</h3>
        <p className="provider-name">{plan.provider}</p>
        
        {/* Match Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${plan.match}%` }}></div>
        </div>

        <div className="reason-box">
          <p className="reason-title">Why we recommend this</p>
          <p className="reason-text">{plan.reason}</p>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <label>Coverage</label>
            <p>{plan.coverage}</p>
          </div>
          <div className="stat-item">
            <label>Premium</label>
            <p>{plan.premium}</p>
          </div>
          <div className="stat-item">
            <label>Claim Ratio</label>
            <p className="highlight-green">{plan.claimRatio}</p>
          </div>
          <div className="stat-item">
            <label>Risk Level</label>
            <span className={`risk-tag ${plan.riskLevel.toLowerCase().replace(' ', '-')}`}>
              {plan.riskLevel}
            </span>
          </div>
        </div>

        <div className="tags-container">
          {plan.tags.map((tag, index) => (
            <span key={index} className="feature-tag">{tag}</span>
          ))}
        </div>

        <button className="select-plan-btn">Select Plan</button>
      </div>
    </div>
  );
};

export default RecommendationCard;