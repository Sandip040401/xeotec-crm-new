import api from "./api";

const authService = {
  register: async (userData) => {
    const response = await api.post(
      "/api/landing/superadmin/register",
      userData
    );
    return response;
  },

  login: async (credentials) => {
    const response = await api.post(
      "/api/landing/superadmin/login",
      credentials
    );
    return response;
  },

  logout: async () => {
    await api.post("/api/user/logout");
  },

  getProfile: async () => {
    const response = await api.get("/api/user/profile");
    return response;
  },
  verifyOtp: async (data) => {
    return await api.post("api/auth/superadmin/login/verify-otp", data);
  },
};

export default authService;
