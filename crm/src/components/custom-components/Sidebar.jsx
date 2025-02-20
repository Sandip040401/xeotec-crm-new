import { useState } from "react";
import {
  FaHome,
  FaUsers,
  FaCog,
  FaUserTie,
  FaTasks,
  FaCalendarCheck,
  FaProjectDiagram,
  FaClipboardList,
  FaUserGraduate,
  FaBars,
} from "react-icons/fa";
import { Link } from "react-router";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`h-screen bg-gray-900 text-white ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 p-4`}
    >
      <button className="text-xl mb-6" onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </button>
      <nav className="flex flex-col space-y-4">
        <SidebarItem
          to="/admin"
          icon={<FaHome />}
          label="Dashboard"
          isOpen={isOpen}
        />
        <SidebarItem
          to="/admin/department"
          icon={<FaUsers />}
          label="Departments"
          isOpen={isOpen}
        />

        <SidebarItem
          to="/employee"
          icon={<FaUserTie />}
          label="Employee"
          isOpen={isOpen}
        />
        <SidebarItem
          to="/roles"
          icon={<FaTasks />}
          label="Roles"
          isOpen={isOpen}
        />
        <SidebarItem
          to="/attendance"
          icon={<FaCalendarCheck />}
          label="Attendance"
          isOpen={isOpen}
        />
        <SidebarItem
          to="/customer"
          icon={<FaUsers />}
          label="Customer"
          isOpen={isOpen}
        />
        <SidebarItem
          to="/project"
          icon={<FaProjectDiagram />}
          label="Project"
          isOpen={isOpen}
        />
        <SidebarItem
          to="/task"
          icon={<FaClipboardList />}
          label="Task"
          isOpen={isOpen}
        />
        <SidebarItem
          to="/internship"
          icon={<FaUserGraduate />}
          label="Internship"
          isOpen={isOpen}
        />
        <SidebarItem
          to="/settings"
          icon={<FaCog />}
          label="Settings"
          isOpen={isOpen}
        />
      </nav>
    </div>
  );
};

const SidebarItem = ({ to, icon, label, isOpen }) => {
  return (
    <Link
      to={to}
      className="flex items-center space-x-4 p-3 hover:bg-gray-700 rounded-md"
    >
      {icon}
      {isOpen && <span>{label}</span>}
    </Link>
  );
};

export default Sidebar;
