import { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  Home,
  Users,
  Settings,
  ListChecks,
  CalendarCheck,
  FolderKanban,
  ClipboardList,
  GraduationCap,
  Menu,
} from "lucide-react"; // ShadCN Icons
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FaUser } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  return (
    <Card
      className={cn(
        "h-full text-sm bg-slate-900 text-white shadow-xl flex flex-col p-4 rounded-r-sm transition-all duration-300",
        isOpen ? "w-64" : "w-20"
      )}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between mb-6">
        <h1
          className={cn(
            "text-base font-bold tracking-wide uppercase transition-all",
            isOpen ? "block" : "hidden"
          )}
        >
          XEOTEC- CRM
        </h1>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={18} />
        </Button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-2 flex-grow">
        <SidebarItem
          to="/admin"
          icon={<Home className="text-blue-400" />}
          label="Dashboard"
          isOpen={isOpen}
          active={location.pathname === "/admin"}
        />
        <SidebarItem
          to="/admin/department"
          icon={<Users className="text-red-400" />}
          label="Departments"
          isOpen={isOpen}
          active={location.pathname === "/admin/department"}
        />
        <SidebarItem
          to="/admin/employee"
          icon={<FaUser className="text-green-400" />}
          label="Employee"
          isOpen={isOpen}
          active={location.pathname === "/employee"}
        />
        <SidebarItem
          to="/admin/role"
          icon={<ListChecks className="text-yellow-400" />}
          label="Roles"
          isOpen={isOpen}
          active={location.pathname === "/admin/role"}
        />
        <SidebarItem
          to="/attendance"
          icon={<CalendarCheck className="text-indigo-400" />}
          label="Attendance"
          isOpen={isOpen}
          active={location.pathname === "/attendance"}
        />
        <SidebarItem
          to="/customer"
          icon={<Users className="text-pink-400" />}
          label="Customer"
          isOpen={isOpen}
          active={location.pathname === "/customer"}
        />
        <SidebarItem
          to="/admin/project"
          icon={<FolderKanban className="text-teal-400" />}
          label="Project"
          isOpen={isOpen}
          active={location.pathname === "/project"}
        />
        <SidebarItem
          to="/task"
          icon={<ClipboardList className="text-orange-400" />}
          label="Task"
          isOpen={isOpen}
          active={location.pathname === "/task"}
        />
        <SidebarItem
          to="/internship"
          icon={<GraduationCap className="text-purple-400" />}
          label="Internship"
          isOpen={isOpen}
          active={location.pathname === "/internship"}
        />
        <SidebarItem
          to="/admin/setting"
          icon={<Settings className="text-gray-400" />}
          label="Settings"
          isOpen={isOpen}
          active={location.pathname === "/settings"}
        />
      </nav>

      {/* User Profile */}
      <Link to={`/admin/profile`} className="flex items-center space-x-2">
        {" "}
        <div className="mt-auto bg-white/10 p-3 w-full rounded-lg flex items-center space-x-3 shadow-md backdrop-blur-md hover:bg-white/20 transition duration-300">
          <img
            src="https://cdn-icons-png.freepik.com/512/9703/9703596.png"
            alt="User"
            className="w-10 h-10 rounded-full border-2 border-white object-contain"
          />

          {isOpen && (
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-white">Xeotec</p>
              <p className="text-xs text-gray-300">Admin</p>
            </div>
          )}
        </div>{" "}
      </Link>
    </Card>
  );
};

const SidebarItem = ({ to, icon, label, isOpen, active }) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center space-x-4 p-3 rounded-lg font-medium transition-all duration-300 text-sm",
        active
          ? "bg-white/20 text-white shadow-lg"
          : "hover:bg-white/10 hover:text-white"
      )}
    >
      {icon}
      {isOpen && <span>{label}</span>}
    </Link>
  );
};

export default Sidebar;
