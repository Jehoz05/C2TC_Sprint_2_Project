import axios from "axios";

const API_BASE_URL = "http://localhost:8080/shopowners";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export const shopOwnerAPI = {
  // Test basic connection
  testConnection: async () => {
    try {
      console.log("🧪 Testing connection to:", API_BASE_URL);
      const response = await axios.get("http://localhost:8080");
      return { success: true, data: response.data };
    } catch (error) {
      console.error("❌ Cannot connect to localhost:8080");
      return { success: false, error: "Spring Boot not running on port 8080" };
    }
  },

  // Test health endpoint
  testHealth: async () => {
    try {
      const response = await api.get("/health"); // This is correct - specific endpoint
      return { success: true, data: response.data };
    } catch (error) {
      console.error("❌ Health endpoint not found");
      return { success: false, error: "Controller not registered" };
    }
  },

  // Test shopowners endpoint - FIXED: Remove the slash
  testShopOwners: async () => {
    try {
      const response = await api.get(""); // ✅ CHANGED: Remove "/"
      return { success: true, data: response.data };
    } catch (error) {
      console.error("❌ Shop owners endpoint not found");
      return { success: false, error: "Shop owners endpoint not available" };
    }
  },

  // Get all shop owners - FIXED: Remove the slash
  getAllShopOwners: async () => {
    try {
      console.log("📋 Fetching all shop owners from:", API_BASE_URL);
      const response = await api.get(""); // ✅ CHANGED: Remove "/"
      console.log("✅ Shop owners fetched successfully");
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching shop owners:", error);
      throw new Error(
        "Backend not running or endpoints not available. Check Spring Boot logs."
      );
    }
  },

  // Get shop owner by ID - FIXED: Remove the leading slash
  getShopOwnerById: async (id) => {
    try {
      const response = await api.get(`/${id}`); // This is correct - has path parameter
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error("Shop owner not found");
      }
      throw new Error("Failed to fetch shop owner");
    }
  },

  // Create shop owner - FIXED: Remove the slash
  createShopOwner: async (shopOwnerData) => {
    try {
      const response = await api.post("", shopOwnerData); // ✅ CHANGED: Remove "/"
      return response.data;
    } catch (error) {
      throw new Error("Failed to create shop owner");
    }
  },

  // Update shop owner - This is correct (has path parameter)
  updateShopOwner: async (id, shopOwnerData) => {
    try {
      const response = await api.put(`/${id}`, shopOwnerData);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error("Shop owner not found");
      }
      throw new Error("Failed to update shop owner");
    }
  },

  // Delete shop owner - This is correct (has path parameter)
  deleteShopOwner: async (id) => {
    try {
      await api.delete(`/${id}`);
    } catch (error) {
      throw new Error("Failed to delete shop owner");
    }
  },
};
