import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, User, Settings, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { useNavigate } from "react-router-dom";
import authService from "@/services/authService.js";

export const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await authService.Slogout();

      if (!response || response.status !== 200) {
        throw new Error(response?.data?.message || "Logout failed");
      }
      sessionStorage.clear();

      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Define navigation routes
  const navItems = [
    {
      icon: <Home size={24} />,
      label: "Dashboard",
      path: "/super-admin-dashboard",
    },
    { icon: <User size={24} />, label: "Profile", path: "profile" },
    { icon: <Settings size={24} />, label: "Settings", path: "settings" },
  ];

  return (
    <div
      className={`fixed ${
        isMobile
          ? "top-0 left-0 w-full flex justify-between p-2 shadow-md"
          : "h-screen w-20 p-4 flex flex-col justify-between shadow-md"
      } transition-all`}
    >
      {/* Navigation Links */}
      <nav className={`flex ${isMobile ? "flex-row gap-4" : "flex-col gap-4"}`}>
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `relative group ${isActive ? "text-blue-500" : ""}`
            }
          >
            <Button variant="ghost" className="relative group">
              {item.icon}
              <span className="absolute left-full ml-2 px-2 py-1 text-sm bg-gray-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {item.label}
              </span>
            </Button>
          </NavLink>
        ))}
      </nav>

      {/* Mode Toggle */}
      <div className={isMobile ? "ml-auto" : "mb-4"}>
        <Button
          variant="outline"
          className="mb-3 hover:bg-red-600"
          size="icon"
          onClick={handleLogout}
        >
          <LogOut />
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
};
