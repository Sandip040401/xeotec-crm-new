import api from "./api";

const roleService = {
    // Create a new role
    create: async (data) => {
        const response = await api.post("/api/roles/create", data); // Adjusted endpoint path to match the backend
        return response;
    },

    // Fetch all roles
    fetch: async () => {
        const response = await api.get("/api/roles"); // Adjusted endpoint path to match the backend
        return response;
    },

    // Get a single role by ID
    getById: async (id) => {
        const response = await api.get(`/api/roles/${id}`); // Adjusted endpoint path to match the backend
        return response;
    },

    // Update a role by ID
    update: async (id, data) => {
        const response = await api.put(`/api/roles/${id}`, data); // Adjusted endpoint path to match the backend
        return response;
    },

    // Delete a role by ID
    delete: async (id) => {
        const response = await api.delete(`/api//roles/${id}`); // Adjusted endpoint path to match the backend
        return response;
    },

    // Assign a permission to a role
    assignPermission: async (roleId, permissionId) => {
        const response = await api.post("/api/roles/assign-permission", { roleId, permissionId }); // Adjusted endpoint path
        return response;
    },

    // Remove a permission from a role
    removePermission: async (roleId, permissionId) => {
        const response = await api.post("/api/roles/remove-permission", { roleId, permissionId }); // Adjusted endpoint path
        return response;
    }
};

export default roleService;
