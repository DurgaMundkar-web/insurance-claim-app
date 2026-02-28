import React from 'react';
import './RecommendationCard.css';

const RecommendationCard = ({ plan }) => {
  // If the data hasn't loaded yet, return null to prevent errors
  if (!plan) return null;

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
            {/* UPDATED: Matches database column name 'claim_ratio' */}
            <p className="highlight-green">{plan.claim_ratio}</p>
          </div>
          <div className="stat-item">
            <label>Risk Level</label>
            {/* UPDATED: Matches database column name 'risk_level' */}
            <span className={`risk-tag ${plan.risk_level ? plan.risk_level.toLowerCase().replace(' ', '-') : ''}`}>
              {plan.risk_level}
            </span>
          </div>
        </div>

        <div className="tags-container">
          {/* Ensure plan.tags exists and is an array before mapping */}
          {plan.tags && Array.isArray(plan.tags) && plan.tags.map((tag, index) => (
            <span key={index} className="feature-tag">{tag}</span>
          ))}
        </div>

        <button className="select-plan-btn">Select Plan</button>
      </div>
    </div>
  );
};

export default RecommendationCard;