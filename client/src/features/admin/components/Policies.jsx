import React, { useState } from "react";
import "../styles/AdminDashboard.css";

const Policies = () => {
  const [policies, setPolicies] = useState([
    {
      id: 1,
      name: "Comprehensive Health Shield",
      provider: "HealthFirst Insurance",
      type: "Health",
      coverage: "₹5.0L",
      premium: "₹15,000",
      claimRatio: "95%",
    },
    {
      id: 2,
      name: "Family Health Plus",
      provider: "StarCare Insurance",
      type: "Health",
      coverage: "₹10.0L",
      premium: "₹25,000",
      claimRatio: "92%",
    },
    {
      id: 3,
      name: "Smart Drive Insurance",
      provider: "AutoSecure",
      type: "Auto",
      coverage: "₹3.0L",
      premium: "₹8,000",
      claimRatio: "88%",
    },
    {
      id: 4,
      name: "Life Guard Premium",
      provider: "LifeSecure Insurance",
      type: "Life",
      coverage: "₹20.0L",
      premium: "₹30,000",
      claimRatio: "98%",
    },
    {
      id: 5,
      name: "Home Protection Plan",
      provider: "HomeSafe Insurance",
      type: "Home",
      coverage: "₹50.0L",
      premium: "₹12,000",
      claimRatio: "90%",
    },
    {
      id: 6,
      name: "Senior Citizen Care",
      provider: "ElderCare Insurance",
      type: "Health",
      coverage: "₹7.5L",
      premium: "₹20,000",
      claimRatio: "94%",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    provider: "",
    type: "Health",
    coverage: "",
    premium: "",
    claimRatio: "",
  });

  const handleAddPolicy = () => {
    setEditingPolicy(null);
    setFormData({
      name: "",
      provider: "",
      type: "Health",
      coverage: "",
      premium: "",
      claimRatio: "",
    });
    setShowModal(true);
  };

  const handleEditPolicy = (policy) => {
    setEditingPolicy(policy.id);
    setFormData({
      name: policy.name,
      provider: policy.provider,
      type: policy.type,
      coverage: policy.coverage,
      premium: policy.premium,
      claimRatio: policy.claimRatio,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPolicy(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSavePolicy = () => {
    if (!formData.name || !formData.provider || !formData.coverage || !formData.premium) {
      alert("Please fill in all required fields");
      return;
    }

    if (editingPolicy) {
      setPolicies(
        policies.map((p) =>
          p.id === editingPolicy ? { ...p, ...formData } : p
        )
      );
    } else {
      const newPolicy = {
        id: Math.max(...policies.map((p) => p.id), 0) + 1,
        ...formData,
      };
      setPolicies([...policies, newPolicy]);
    }
    handleCloseModal();
  };

  const getTypeColor = (type) => {
    const colors = {
      Health: "#10b981",
      Auto: "#3b82f6",
      Life: "#f59e0b",
      Home: "#8b5cf6",
    };
    return colors[type] || "#6b7280";
  };

  return (
    <div className="users-section">
      <div className="section-header">
        <div>
          <h2>Policies</h2>
          <p className="section-subtitle">Manage insurance policies and coverage details</p>
        </div>
        <button 
          className="btn-primary" 
          onClick={handleAddPolicy}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <span>+</span> Add Policy
        </button>
      </div>

      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Policy Name</th>
              <th>Provider</th>
              <th>Type</th>
              <th>Coverage</th>
              <th>Premium</th>
              <th>Claim Ratio</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => (
              <tr key={policy.id}>
                <td style={{ fontWeight: 600, color: "var(--primary)" }}>{policy.name}</td>
                <td style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "16px" }}>📋</span>
                  {policy.provider}
                </td>
                <td>
                  <span
                    className="pill"
                    style={{
                      backgroundColor: `${getTypeColor(policy.type)}20`,
                      color: getTypeColor(policy.type),
                    }}
                  >
                    {policy.type}
                  </span>
                </td>
                <td style={{ fontWeight: 600 }}>{policy.coverage}</td>
                <td style={{ fontWeight: 600 }}>{policy.premium}</td>
                <td style={{ color: "#10b981", fontWeight: 600 }}>{policy.claimRatio}</td>
                <td>
                  <button
                    onClick={() => handleEditPolicy(policy)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--primary)",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "14px",
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingPolicy ? "Edit Policy" : "Add New Policy"}</h3>
              <button className="modal-close" onClick={handleCloseModal}>×</button>
            </div>

            <div className="modal-body">
              <div className="modal-field">
                <label>Policy Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="modal-input"
                  placeholder="e.g., Comprehensive Health Shield"
                />
              </div>

              <div className="modal-field">
                <label>Provider *</label>
                <input
                  type="text"
                  name="provider"
                  value={formData.provider}
                  onChange={handleInputChange}
                  className="modal-input"
                  placeholder="e.g., HealthFirst Insurance"
                />
              </div>

              <div className="modal-field">
                <label>Policy Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="modal-input"
                >
                  <option value="Health">Health</option>
                  <option value="Auto">Auto</option>
                  <option value="Life">Life</option>
                  <option value="Home">Home</option>
                </select>
              </div>

              <div className="modal-field">
                <label>Coverage Amount *</label>
                <input
                  type="text"
                  name="coverage"
                  value={formData.coverage}
                  onChange={handleInputChange}
                  className="modal-input"
                  placeholder="e.g., ₹5.0L"
                />
              </div>

              <div className="modal-field">
                <label>Premium *</label>
                <input
                  type="text"
                  name="premium"
                  value={formData.premium}
                  onChange={handleInputChange}
                  className="modal-input"
                  placeholder="e.g., ₹15,000"
                />
              </div>

              <div className="modal-field">
                <label>Claim Ratio</label>
                <input
                  type="text"
                  name="claimRatio"
                  value={formData.claimRatio}
                  onChange={handleInputChange}
                  className="modal-input"
                  placeholder="e.g., 95%"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleSavePolicy}>
                {editingPolicy ? "Update Policy" : "Add Policy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Policies;
