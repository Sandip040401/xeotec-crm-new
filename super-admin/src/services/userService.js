import api from "./api";

const userService = {
  getAdmins: async () => {
    const response = await api.get("/api/users/admin");
    return response;
  },
  createAdmin: async (data) => {
    const response = await api.post("/api/users/admin/create", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },
};

export default userService;
