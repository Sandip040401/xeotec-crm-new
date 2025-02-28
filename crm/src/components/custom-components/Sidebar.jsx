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
  Landmark,
  SquareMenu,
} from "lucide-react"; // ShadCN Icons
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FaUber, FaUser } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  return (
    <div
      className={cn(
        "h-full  dark:bg-black bg-white   dark:text-white shadow-xl flex flex-col p-4 rounded-r-md transition-all duration-300",
        isOpen ? "w-64" : "w-20"
      )}
    >
      {/* Sidebar Header */}
      <div className="flex items-center  justify-between mb-6">
        <Button
          variant="ghost"
          size="icon"
          className="text-black dark:text-white hover:bg-white/20 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          <SquareMenu />
        </Button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-2 flex-grow text-xs">
        <SidebarItem
          to="/admin"
          icon={<Home className="" />}
          label="Dashboard"
          isOpen={isOpen}
          active={location.pathname === "/admin"}
        />
        <SidebarItem
          to="/admin/department"
          icon={<Landmark />}
          label="Departments"
          isOpen={isOpen}
          active={location.pathname === "/admin/department"}
        />
        <SidebarItem
          to="/employee"
          icon={<Users className="" />}
          label="Employee"
          isOpen={isOpen}
          active={location.pathname === "/employee"}
        />
        <SidebarItem
          to="/admin/role"
          icon={<ListChecks className="0" />}
          label="Roles"
          isOpen={isOpen}
          active={location.pathname === "/admin/role"}
        />
        <SidebarItem
          to="/attendance"
          icon={<CalendarCheck className="0" />}
          label="Attendance"
          isOpen={isOpen}
          active={location.pathname === "/attendance"}
        />
        <SidebarItem
          to="/customer"
          icon={<Users className="" />}
          label="Customer"
          isOpen={isOpen}
          active={location.pathname === "/customer"}
        />
        <SidebarItem
          to="/project"
          icon={<FolderKanban className="" />}
          label="Project"
          isOpen={isOpen}
          active={location.pathname === "/project"}
        />
        <SidebarItem
          to="/task"
          icon={<ClipboardList className="" />}
          label="Task"
          isOpen={isOpen}
          active={location.pathname === "/task"}
        />
        <SidebarItem
          to="/internship"
          icon={<GraduationCap className="" />}
          label="Internship"
          isOpen={isOpen}
          active={location.pathname === "/internship"}
        />
        <SidebarItem
          to="/settings"
          icon={<Settings className="" />}
          label="Settings"
          isOpen={isOpen}
          active={location.pathname === "/settings"}
        />
      </nav>

      {/* User Profile */}
    </div>
  );
};

const SidebarItem = ({ to, icon, label, isOpen, active }) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center space-x-4 p-3 rounded-lg font-medium transition-all duration-300 text-xs",
        active ? "bg-white/20 shadow-lg" : "hover:bg-white/10 "
      )}
    >
      {icon}
      {isOpen && <span>{label}</span>}
    </Link>
  );
};

export default Sidebar;
