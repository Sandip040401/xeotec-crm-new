import api from "./api";

const companyService = {
  createCompanies: async (companyData) => {
    const response = await api.post("/api/company/create", companyData);
    return response;
  },

  getCompanies: async () => {
    const response = await api.get("/api/company/");
    return response;
  },
};

export default companyService;
