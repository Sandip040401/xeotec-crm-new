import api from "./api";

const authService = {
  register: async (userData) => {
    const response = await api.post("/api/user/register", userData);
    return response;
  },

  login: async (credentials) => {
    const response = await api.post("/api/user/login", credentials);
    return response;
  },

  userlogin: async (credentials) => {
    try {
      const response = await api.post("/api/auth/user/login", credentials);

      // Check if response contains data property with success flag
      if (response && response.data) {
        return response.data;
      }

      return response; // Fallback in case response structure is different
    } catch (error) {
      // Handle errors properly
      console.error("Login API error:", error);

      // Return a standardized error object
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "An error occurred during login",
      };
    }
  },
  // logout: async () => {
  //     await api.post("/api/user/logout");
  // },

  // getProfile: async () => {
  //     const response = await api.get("/api/user/profile");
  //     return response;
  // },
};

export default authService;
