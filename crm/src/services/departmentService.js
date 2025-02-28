import api from "./api";

const departmentService = {
    // Create a new department
    create: async (data) => {
        // Makes a POST request to the backend to create a department with the provided data
        const response = await api.post("/api/company/department/create", data);
        return response; // Returns the API response
    },

    // Fetch all departments (commented-out edit function is not used here)
    fetch: async (data) => {
        // Makes a GET request to fetch the list of departments from the backend
        // The `data` argument can be used for query parameters if necessary
        const response = await api.get("/api/company/department", data);
        return response; // Returns the API response (list of departments)
    },

    // Placeholder for a possible future 'edit' function, commented out
    // edit: async (data) => {
    //     const response = await api.patch("/company/user/login", data); 
    //     return response; 
    // },

    // Placeholder for a possible future 'delete' function, commented out
    // delete: async () => {
    //     await api.post("/api/user/logout"); 
    // },

};

export default departmentService;
