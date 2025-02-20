import { Outlet } from "react-router-dom";
import Sidebar from "@/pages/SuperAdmin/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
