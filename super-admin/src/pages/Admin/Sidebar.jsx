import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, User, Settings } from "lucide-react";

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`fixed ${
        isMobile
          ? "top-0 w-full flex justify-around p-2 bg-white shadow-md"
          : "h-screen w-20 p-4"
      } transition-all`}
    >
      <nav className={`flex ${isMobile ? "flex-row gap-4" : "flex-col gap-4"}`}>
        {[
          { icon: <Home size={24} />, label: "Dashboard" },
          { icon: <User size={24} />, label: "Profile" },
          { icon: <Settings size={24} />, label: "Settings" },
        ].map((item, index) => (
          <Button key={index} variant="ghost" className="relative group">
            {item.icon}
            <span className="absolute left-full ml-2 px-2 py-1 text-sm bg-gray-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {item.label}
            </span>
          </Button>
        ))}
      </nav>
    </div>
  );
};

export default function Layout() {
  return (
    <div className="flex">
      <Sidebar />
    </div>
  );
}
