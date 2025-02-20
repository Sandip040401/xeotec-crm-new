import React from "react";
import Sidebar from "../components/custom-components/Sidebar";
import Dashboard from "../pages/admin/Dashboard";
const AdminLayout = () => {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default AdminLayout;
