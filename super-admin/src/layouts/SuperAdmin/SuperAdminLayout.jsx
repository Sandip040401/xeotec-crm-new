import { Sidebar } from "@/pages/SuperAdmin/Sidebar";
import { Outlet } from "react-router-dom";

const SuperAdminLayout = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <main className="flex-1 p-6 md:pl-20 pt-20 md:pt-6">
        <Outlet />
      </main>
    </div>
  );
};

export default SuperAdminLayout;
