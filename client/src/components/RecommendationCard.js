import React from 'react';
import './RecommendationCard.css';

const RecommendationCard = ({ plan }) => {

  // Default Family Health Plus Policy
  const defaultPlan = {
    top: true,
    category: "Health Insurance",
    title: "Family Health Plus Policy",
    provider: "Star Health Insurance",
    match: 92,
    why: "This plan offers comprehensive family coverage with high claim settlement ratio and affordable premium, making it ideal for families seeking complete protection.",
    coverage: "₹10,00,000",
    premium: "₹12,499/year",
    claimRatio: "98.4%",
    risk: "Low Risk",
    features: [
      "Cashless Hospitalization",
      "Pre & Post Hospitalization Cover",
      "No Claim Bonus",
      "Free Annual Health Checkup",
      "Family Floater Option"
    ]
  };

  const selectedPlan = plan || defaultPlan;

  return (
    <div className="policy-card">
      {selectedPlan.top && <p className="top-label">✨ TOP RECOMMENDATION</p>}
      
      <div className="card-top">
        <div className="plan-info">
          <span className="category-pill">{selectedPlan.category}</span>
          <h2 className="plan-title">{selectedPlan.title}</h2>
          <p className="plan-provider">{selectedPlan.provider}</p>
        </div>
        <div className="match-indicator">
          <span className="match-percent">{selectedPlan.match}%</span>
          <span className="match-text">Match</span>
        </div>
      </div>

      <div className="match-bar-bg">
        <div 
          className="match-bar-fill" 
          style={{ width: `${selectedPlan.match}%` }}
        ></div>
      </div>

      <div className="why-box">
        <p className="why-title">Why we recommend this</p>
        <p className="why-body">{selectedPlan.why}</p>
      </div>

      <div className="info-grid">
        <div className="info-item">
          <label>Coverage</label>
          <p>{selectedPlan.coverage}</p>
        </div>
        <div className="info-item">
          <label>Premium</label>
          <p>{selectedPlan.premium}</p>
        </div>
        <div className="info-item">
          <label>Claim Ratio</label>
          <p className="green-stat">{selectedPlan.claimRatio}</p>
        </div>
        <div className="info-item">
          <label>Risk Level</label>
          <span className={`risk-pill ${selectedPlan.risk?.toLowerCase().replace(' ', '-')}`}>
            {selectedPlan.risk}
          </span>
        </div>
      </div>

      <div className="features-container">
        {selectedPlan.features?.map((f, i) => (
          <span key={i} className="feature-tag">{f}</span>
        ))}
      </div>

      <button className="select-btn">Select Plan</button>
    </div>
  );
};

export default RecommendationCard;