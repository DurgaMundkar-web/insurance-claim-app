import React, { useState, useEffect } from "react";
import { getFraudRules, createFraudRule, deleteFraudRule } from "../services/adminService";
import "../styles/AdminDashboard.css";

const FraudRules = () => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newRule, setNewRule] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      setLoading(true);
      const data = await getFraudRules();
      setRules(data);
      setError(null);
    } catch (err) {
      setError("Failed to load fraud rules");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRule = async () => {
    if (!newRule.name || !newRule.description) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await createFraudRule(newRule);
      setNewRule({ name: "", description: "" });
      setShowModal(false);
      fetchRules();
    } catch (err) {
      alert("Failed to add fraud rule");
      console.error(err);
    }
  };

  const handleDeleteRule = async (ruleId) => {
    if (window.confirm("Are you sure you want to delete this fraud rule?")) {
      try {
        await deleteFraudRule(ruleId);
        fetchRules();
      } catch (err) {
        alert("Failed to delete fraud rule");
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading fraud rules...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="fraud-rules-section">
      <div className="section-header">
        <div>
          <h2>Fraud Rules Management</h2>
          <p className="section-subtitle">Keep detection rules current and actionable.</p>
        </div>
        <div className="header-actions">
          <span className="pill">Rules: {rules.length}</span>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            + Add Rule
          </button>
        </div>
      </div>

      <div className="rules-grid">
        {rules.length === 0 ? (
          <div className="no-data">No fraud rules found. Add one to get started.</div>
        ) : (
          rules.map((rule) => (
            <div key={rule.id} className="rule-card">
              <div className="rule-header">
                <h3 className="rule-name">{rule.name}</h3>
                <div className="rule-actions">
                  <span className="pill pill-soft">Active</span>
                  <button
                    className="btn-delete-small"
                    onClick={() => handleDeleteRule(rule.id)}
                    title="Delete Rule"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <p className="rule-description">{rule.description}</p>
            </div>
          ))
        )}
      </div>

      {/* Add Rule Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Add Fraud Rule</h3>
            <input
              type="text"
              placeholder="Rule Name"
              className="input-field"
              value={newRule.name}
              onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
            />
            <textarea
              placeholder="Rule Description"
              className="textarea-field"
              value={newRule.description}
              onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
              rows="4"
            />
            <div className="modal-actions">
              <button className="btn-primary" onClick={handleAddRule}>
                Save Rule
              </button>
              <button className="btn-secondary" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FraudRules;
