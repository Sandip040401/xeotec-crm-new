import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService"; // Import authService
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authService.getProfile();
        setUser(response.data);
        const currentPath = window.location.pathname; // Get current path

        if (
          response.data.role === "admin" &&
          currentPath !== "/admin/user-management"
        ) {
          navigate("/admin/user-management");
        } else if (
          response.data.role !== "admin" &&
          currentPath !== "/profile"
        ) {
          navigate("/profile");
        }
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      setUser(response.data);
      navigate("/profile");
      return response;
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authService.logout();

      window.location.replace("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};
