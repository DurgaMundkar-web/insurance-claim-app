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
  const [quickStats, setQuickStats] = useState({
    approval_rate: 0,
    avg_processing_time: 0,
    customer_satisfaction: 0,
  });
  const [systemAlerts, setSystemAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOverview();
  }, []);

  const fetchOverview = async () => {
    try {
      setLoading(true);
      const [overviewData, quickStatsData, systemAlertsData] = await Promise.all([
        getOverview(),
        fetch("http://localhost:8000/admin/quick-stats").then(res => res.json()),
        fetch("http://localhost:8000/admin/system-alerts").then(res => res.json()),
      ]);
      setStats(overviewData);
      setQuickStats(quickStatsData);
      setSystemAlerts(systemAlertsData.alerts || []);
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
      title: "Total Claims",
      value: stats.claims || 0,
      change: "+8%",
      changeLabel: "vs last month",
      icon: "📄",
      bgColor: "#ffffff",
    },
    {
      title: "High-Risk Claims",
      value: stats.fraud_alerts || 0,
      change: "-12%",
      changeLabel: "vs last month",
      icon: "⚠️",
      bgColor: "#ffffff",
    },
    {
      title: "Active Policies",
      value: stats.active_policies || 0,
      change: "+5%",
      changeLabel: "vs last month",
      icon: "🛡️",
      bgColor: "#ffffff",
    },
    {
      title: "Users with Plans",
      value: stats.total_users || 0,
      change: "+3%",
      changeLabel: "vs last month",
      icon: "👥",
      bgColor: "#ffffff",
    },
  ];

  return (
    <>
      <div className="overview-cards-grid">
        {cards.map((card, index) => (
          <div key={index} className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">{card.title}</span>
              <span className="stat-card-icon">{card.icon}</span>
            </div>
            <div className="stat-card-value">{card.value}</div>
            <div className="stat-card-change">
              <span className="change-indicator">{card.change}</span>
              <span className="change-label">{card.changeLabel}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="overview-bottom-section">
        <div className="activity-section">
          <h3 className="section-heading">Recent Activity</h3>
          <div className="activity-content">
            {/* Empty for now */}
          </div>
        </div>

        <div className="alerts-stats-section">
          <div className="system-alerts">
            <h3 className="section-heading">System Alerts</h3>
            {systemAlerts.map((alert, index) => (
              <div 
                key={index} 
                className={`alert-item alert-${alert.priority.toLowerCase()}`}
              >
                <span className="alert-icon">{alert.icon}</span>
                <div className="alert-content">
                  <div className="alert-priority">{alert.priority} Priority</div>
                  <div className="alert-message">{alert.message}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="quick-stats">
            <h3 className="section-heading">Quick Stats</h3>
            <div className="quick-stat-item">
              <div className="quick-stat-label">Approval Rate</div>
              <div className="quick-stat-value">{quickStats.approval_rate}%</div>
            </div>
            <div className="quick-stat-item">
              <div className="quick-stat-label">Avg. Processing Time</div>
              <div className="quick-stat-value">{quickStats.avg_processing_time} days</div>
            </div>
            <div className="quick-stat-item">
              <div className="quick-stat-label">Customer Satisfaction</div>
              <div className="quick-stat-value">{quickStats.customer_satisfaction}/5</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewCards;

