import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, User, Settings } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom"; // Ensure Outlet is imported

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Define navigation routes
  const navItems = [
    {
      icon: <Home size={24} />,
      label: "Dashboard",
      path: "/super-admin-dashboard",
    },
    {
      icon: <User size={24} />,
      label: "Profile",
      path: "profile",
    },
    { icon: <Settings size={24} />, label: "Settings", path: "/settings" },
  ];

  return (
    <div
      className={`fixed ${
        isMobile
          ? "top-0 w-full flex justify-around p-2 bg-white shadow-md"
          : "h-screen w-20 p-4"
      } transition-all`}
    >
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
    </div>
  );
};

// Layout Component
export default function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-20 p-4">
        <Outlet /> {/* This renders the routed content */}
      </main>
    </div>
  );
}
