import React, { useState, useEffect } from "react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getUsers } from "../services/adminService";
import "../styles/AdminDashboard.css";

const ActivePolicies = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get consistent active plans based on user ID
  const getActivePlansForUser = (userId) => {
    return (userId % 4) + 1; // 1-4 plans
  };

  // Get consistent coverage based on user ID
  const getCoverageForUser = (userId) => {
    const baseAmount = 5 + ((userId * 7) % 21); // ₹5L to ₹25L
    return `₹${baseAmount.toFixed(1)}L`;
  };

  // Get risk level based on user ID
  const getRiskLevelForUser = (userId) => {
    const levels = ["Low", "Medium", "High"];
    return levels[userId % 3];
  };

  useEffect(() => {
    fetchUsers();
    // Refresh every 5 seconds to stay in sync with UsersTable
    const interval = setInterval(fetchUsers, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError("Failed to load users with active policies");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Generate chart data from users
  const getChartData = () => {
    const providers = ["HealthFirst", "StarCare", "AutoSecure", "LifeSecure", "HomeSafe"];
    return providers.map((provider) => ({
      name: provider,
      policies: Math.floor(Math.random() * users.length) + 1,
      active: Math.floor(Math.random() * 5) + 1,
    }));
  };

  // Generate risk level distribution
  const getRiskDistribution = () => {
    const riskCounts = { "Low": 0, "Medium": 0, "High": 0 };
    users.forEach((user) => {
      riskCounts[getRiskLevelForUser(user.id)]++;
    });
    return [
      { name: "Low Risk", value: riskCounts.Low, color: "#6b7280" },
      { name: "Medium Risk", value: riskCounts.Medium, color: "#f59e0b" },
      { name: "High Risk", value: riskCounts.High, color: "#ef4444" },
    ].filter(item => item.value > 0);
  };

  const stats = {
    totalActive: users.filter((u) => u.status?.toLowerCase() === "active").length,
    monthlyGrowth: "+8.5%",
    usersWithPlans: users.length,
  };

  return (
    <div>
      {loading && <div className="loading">Loading users with active policies...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && (
        <>
          {/* Overview Cards */}
          <div className="overview-cards" style={{ marginBottom: "36px" }}>
            <div className="overview-card">
              <div className="card-top">
                <div>
                  <p className="card-title">Total Active Policies</p>
                  <p className="card-value">{stats.totalActive}</p>
                </div>
                <div className="card-icon">
                  <span style={{ fontSize: "20px" }}>🛡️</span>
                </div>
              </div>
            </div>

            <div className="overview-card">
              <div className="card-top">
                <div>
                  <p className="card-title">Monthly Growth</p>
                  <p className="card-value" style={{ fontSize: "32px" }}>
                    {stats.monthlyGrowth}
                  </p>
                </div>
                <div className="card-icon">
                  <span style={{ fontSize: "20px" }}>📈</span>
                </div>
              </div>
            </div>

            <div className="overview-card">
              <div className="card-top">
                <div>
                  <p className="card-title">Users with Active Plans</p>
                  <p className="card-value">{stats.usersWithPlans}</p>
                </div>
                <div className="card-icon">
                  <span style={{ fontSize: "20px" }}>👥</span>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "36px" }}>
            {/* Policies by Provider Chart */}
            <div className="users-section">
              <h2 style={{ fontSize: "18px", marginBottom: "20px", color: "var(--primary)" }}>
                Active Policies by Provider
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
                  <Legend />
                  <Bar dataKey="policies" fill="#1b5e20" name="Total Policies" />
                  <Bar dataKey="active" fill="#9ccc65" name="Active" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Risk Level Distribution */}
            <div className="users-section">
              <h2 style={{ fontSize: "18px", marginBottom: "20px", color: "var(--primary)" }}>
                Risk Level Distribution
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={getRiskDistribution()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {getRiskDistribution().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Users Table */}
          <div className="users-section">
            <div className="section-header">
              <div>
                <h2>All Users with Active Policies</h2>
                <p className="section-subtitle">Same users from your system with their active insurance policies and risk levels</p>
              </div>
              <div className="header-actions">
                <span className="pill">Total: {users.length}</span>
              </div>
            </div>

            <div className="table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Active Plans</th>
                    <th>Total Coverage</th>
                    <th>Risk Level</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="no-data">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>
                          <span className="user-cell">
                            <span className="user-avatar" aria-hidden="true">
                              {user.name?.charAt(0)?.toUpperCase() || "U"}
                            </span>
                            <span className="user-name">{user.name}</span>
                          </span>
                        </td>
                        <td>{user.email}</td>
                        <td style={{ fontWeight: 600, color: "var(--primary)" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                            ○ {getActivePlansForUser(user.id)}
                          </span>
                        </td>
                        <td style={{ fontWeight: 600, color: "var(--primary)" }}>
                          {getCoverageForUser(user.id)}
                        </td>
                        <td>
                          <span
                            className="pill"
                            style={{
                              backgroundColor:
                                getRiskLevelForUser(user.id) === "High"
                                  ? "rgba(239, 68, 68, 0.15)"
                                  : getRiskLevelForUser(user.id) === "Medium"
                                  ? "rgba(245, 158, 11, 0.15)"
                                  : "rgba(156, 163, 175, 0.15)",
                              color:
                                getRiskLevelForUser(user.id) === "High"
                                  ? "#dc2626"
                                  : getRiskLevelForUser(user.id) === "Medium"
                                  ? "#d97706"
                                  : "#4b5563",
                            }}
                          >
                            {getRiskLevelForUser(user.id)}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge ${user.status?.toLowerCase()}`}>
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ActivePolicies;
