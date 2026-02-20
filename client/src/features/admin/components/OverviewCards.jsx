import React, { useEffect, useState } from "react";
import { getOverview } from "../services/adminService";
import "../styles/AdminDashboard.css";

const OverviewCards = () => {
  const [stats, setStats] = useState({
    total_users: 0,
    active_policies: 0,
    claims: 0,
    fraud_alerts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOverview();
  }, []);

  const fetchOverview = async () => {
    try {
      setLoading(true);
      const data = await getOverview();
      setStats(data);
      setError(null);
    } catch (err) {
      setError("Failed to load overview data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading overview...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const cards = [
    {
      title: "Total Users",
      value: stats.total_users,
      color: "#1B5E20",
      badge: "Live",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 18.5c0-3 2.5-5.5 5.5-5.5h3c3 0 5.5 2.5 5.5 5.5V20H5v-1.5z" fill="currentColor" opacity="0.25" />
          <path d="M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: "Active Policies",
      value: stats.active_policies,
      color: "#2E7D32",
      badge: "Stable",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 12c0-4.4 3.6-8 8-8h4a4 4 0 0 1 4 4v8.5a1.5 1.5 0 0 1-2.4 1.2l-2.4-1.8H12c-4.4 0-8-3.6-8-8z" fill="currentColor" opacity="0.25" />
          <path d="M8 11h8v2H8v-2z" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: "Claims",
      value: stats.claims,
      color: "#388E3C",
      badge: "Monthly",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 4h8l4 4v12H6V4z" fill="currentColor" opacity="0.25" />
          <path d="M8 12h8v2H8v-2zm0 4h5v2H8v-2z" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: "Fraud Alerts",
      value: stats.fraud_alerts,
      color: "#C62828",
      badge: "Watch",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3l8 4v6c0 4.4-3.1 8.4-8 9.9-4.9-1.5-8-5.5-8-9.9V7l8-4z" fill="currentColor" opacity="0.25" />
          <path d="M11 7h2v6h-2V7zm0 8h2v2h-2v-2z" fill="currentColor" />
        </svg>
      ),
    },
  ];

  return (
    <div className="overview-cards">
      {cards.map((card, index) => (
        <div
          key={index}
          className="overview-card"
          style={{ backgroundColor: card.color }}
        >
          <div className="card-top">
            <div className="card-icon">{card.icon}</div>
            <span className="card-chip">{card.badge}</span>
          </div>
          <h3 className="card-title">{card.title}</h3>
          <h1 className="card-value">{card.value}</h1>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;

