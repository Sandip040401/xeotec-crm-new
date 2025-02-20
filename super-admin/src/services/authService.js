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

  logout: async () => {
    await api.post("/api/user/logout");
  },

  getProfile: async () => {
    const response = await api.get("/api/user/profile");
    return response;
  },
};

export default authService;
