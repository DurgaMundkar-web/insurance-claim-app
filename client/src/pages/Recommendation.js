import React, { useState, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import RecommendationCard from '../components/RecommendationCard';
import './Recommendation.css';

const Recommendation = () => {
  const [recommendations, setRecommendations] = useState([]); // Start as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/recommendations')
      .then((res) => {
        if (!res.ok) {
           return res.json().then(err => { throw new Error(err.detail || "Server Error") });
        }
        return res.json();
      })
      .then((data) => {
        // SAFETY CHECK: Ensure 'data' is actually a list before saving it
        if (Array.isArray(data)) {
          setRecommendations(data);
        } else {
          setRecommendations([]); 
          console.error("Data is not a list:", data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <main className="main-content">
        <header className="content-header">
          <div className="header-icon">✨</div>
          <div className="header-text">
            <h1>AI Recommendations</h1>
            <p>Personalized suggestions from the database</p>
          </div>
        </header>

        <div className="policy-list-container">
          {loading && <p>Loading data...</p>}
          
          {/* This error message will tell us what is wrong with the Database */}
          {error && <p style={{ color: 'red' }}>Backend Error: {error}</p>}

          {!loading && !error && recommendations.length > 0 ? (
            recommendations.map((policy) => (
              <RecommendationCard key={policy.id} plan={policy} />
            ))
          ) : (
            !loading && !error && <p>No plans found in database.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Recommendation;