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
import React, { useEffect, useState } from 'react';
import { catalogService } from '../services/apiService';
import './RecommendationCard.css';

const RecommendationCard = ({ category = null, topOnly = false }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRecommendations();
  }, [category, topOnly]);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      let data;
      
      if (topOnly) {
        data = await catalogService.getTopRecommendations(category);
      } else {
        data = await catalogService.getRecommendations({
          category: category,
        });
      }
      
      const recs = Array.isArray(data) ? data : data.recommendations || [];
      setRecommendations(recs);
      setSelectedIndex(0);
      setError(null);
    } catch (err) {
      setError("Failed to load recommendations");
      console.error(err);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="policy-card"><p>Loading recommendations...</p></div>;
  }

  if (error) {
    return <div className="policy-card"><p style={{ color: 'red' }}>{error}</p></div>;
  }

  if (recommendations.length === 0) {
    return (
      <div className="policy-card">
        <p style={{ textAlign: 'center', color: '#6b7280' }}>
          No recommendations available. Try adjusting your filters.
        </p>
      </div>
    );
  }

  const plan = recommendations[selectedIndex];

  return (
    <div className="policy-card">
      {plan.is_top_recommendation && <p className="top-label">✨ TOP RECOMMENDATION</p>}
      
      <div className="card-top">
        <div className="plan-info">
          <span className="category-pill">{plan.category}</span>
          <h2 className="plan-title">{plan.title}</h2>
          <p className="plan-provider">{plan.provider}</p>
        </div>
        <div className="match-indicator">
          <span className="match-percent">{Math.round(plan.match_score)}%</span>
          <span className="match-text">Match</span>
        </div>
      </div>

      <div className="match-bar-bg">
        <div 
          className="match-bar-fill" 
          style={{ width: `${plan.match_score}%` }}
        ></div>
      </div>

      <div className="why-box">
        <p className="why-title">Why we recommend this</p>
        <p className="why-body">{plan.why || 'Great match for your profile'}</p>
        {plan.family_health && (
          <p className="family-health-info" style={{ fontSize: '13px', color: '#4b5563', marginTop: '8px' }}>
            👨‍👩‍👧‍👦 {plan.family_health}
          </p>
        )}
      </div>

      <div className="info-grid">
        <div className="info-item">
          <label>Coverage</label>
          <p>{plan.coverage}</p>
        </div>
        <div className="info-item">
          <label>Premium</label>
          <p>{plan.premium}</p>
        </div>
        <div className="info-item">
          <label>Claim Ratio</label>
          <p className="green-stat">{plan.claim_ratio}</p>
        </div>
        <div className="info-item">
          <label>Risk Level</label>
          <span className={`risk-pill ${plan.risk_level?.toLowerCase().replace(' ', '-')}`}>
            {plan.risk_level}
          </span>
        </div>
      </div>

      {recommendations.length > 1 && (
        <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '12px', color: '#6b7280' }}>
          <p>Showing {selectedIndex + 1} of {recommendations.length} recommendations</p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '8px' }}>
            <button
              onClick={() => setSelectedIndex(Math.max(0, selectedIndex - 1))}
              disabled={selectedIndex === 0}
              style={{
                padding: '6px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                background: selectedIndex === 0 ? '#f3f4f6' : 'white',
                cursor: selectedIndex === 0 ? 'not-allowed' : 'pointer',
                color: selectedIndex === 0 ? '#d1d5db' : '#374151',
              }}
            >
              ← Previous
            </button>
            <button
              onClick={() => setSelectedIndex(Math.min(recommendations.length - 1, selectedIndex + 1))}
              disabled={selectedIndex === recommendations.length - 1}
              style={{
                padding: '6px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                background: selectedIndex === recommendations.length - 1 ? '#f3f4f6' : 'white',
                cursor: selectedIndex === recommendations.length - 1 ? 'not-allowed' : 'pointer',
                color: selectedIndex === recommendations.length - 1 ? '#d1d5db' : '#374151',
              }}
            >
              Next →
            </button>
          </div>
        </div>
      )}

      <button className="select-btn">Select Plan</button>
    </div>
  );
};

export default RecommendationCard;