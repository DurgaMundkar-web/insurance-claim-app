import axios from "axios";

const API_BASE_URL = "http://localhost:8000/admin";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================================
// OVERVIEW API
// ============================================
export const getOverview = async () => {
  try {
    const response = await apiClient.get("/overview");
    return response.data;
  } catch (error) {
    console.error("Error fetching overview:", error);
    throw error;
  }
};

// ============================================
// USER APIs
// ============================================
export const getUsers = async () => {
  try {
    const response = await apiClient.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await apiClient.post("/users", userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    await apiClient.delete(`/users/${userId}`);
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const toggleUserStatus = async (userId) => {
  try {
    const response = await apiClient.put(`/users/${userId}/toggle-status`);
    return response.data;
  } catch (error) {
    console.error("Error toggling user status:", error);
    throw error;
  }
};

// ============================================
// FRAUD RULE APIs
// ============================================
export const getFraudRules = async () => {
  try {
    const response = await apiClient.get("/fraud-rules");
    return response.data;
  } catch (error) {
    console.error("Error fetching fraud rules:", error);
    throw error;
  }
};

export const createFraudRule = async (ruleData) => {
  try {
    const response = await apiClient.post("/fraud-rules", ruleData);
    return response.data;
  } catch (error) {
    console.error("Error creating fraud rule:", error);
    throw error;
  }
};

export const deleteFraudRule = async (ruleId) => {
  try {
    await apiClient.delete(`/fraud-rules/${ruleId}`);
    return true;
  } catch (error) {
    console.error("Error deleting fraud rule:", error);
    throw error;
  }
};

export const updateFraudRule = async (ruleId, ruleData) => {
  try {
    const response = await apiClient.put(`/fraud-rules/${ruleId}`, ruleData);
    return response.data;
  } catch (error) {
    console.error("Error updating fraud rule:", error);
    throw error;
  }
};

export const toggleFraudRuleStatus = async (ruleId) => {
  try {
    const response = await apiClient.put(`/fraud-rules/${ruleId}/toggle-status`);
    return response.data;
  } catch (error) {
    console.error("Error toggling fraud rule status:", error);
    throw error;
  }
};

// ============================================
// CLAIMS APIs
// ============================================
export const getClaims = async () => {
  try {
    const response = await apiClient.get("/claims");
    return response.data;
  } catch (error) {
    console.error("Error fetching claims:", error);
    throw error;
  }
};

export const createClaim = async (claimData) => {
  try {
    const response = await apiClient.post("/claims", claimData);
    return response.data;
  } catch (error) {
    console.error("Error creating claim:", error);
    throw error;
  }
};

export const deleteClaim = async (claimId) => {
  try {
    await apiClient.delete(`/claims/${claimId}`);
    return true;
  } catch (error) {
    console.error("Error deleting claim:", error);
    throw error;
  }
};

// ============================================
// ANALYTICS API
// ============================================
export const getAnalytics = async () => {
  try {
    const response = await apiClient.get("/analytics");
    return response.data;
  } catch (error) {
    console.error("Error fetching analytics:", error);
    throw error;
  }
};

export const getComprehensiveAnalytics = async () => {
  try {
    const response = await apiClient.get("/analytics/comprehensive");
    return response.data;
  } catch (error) {
    console.error("Error fetching comprehensive analytics:", error);
    throw error;
  }
};

const adminService = {
  getOverview,
  getUsers,
  createUser,
  deleteUser,
  toggleUserStatus,
  getFraudRules,
  createFraudRule,
  deleteFraudRule,
  updateFraudRule,
  toggleFraudRuleStatus,
  getClaims,
  createClaim,
  getAnalytics,
  getComprehensiveAnalytics,
};

export default adminService;

