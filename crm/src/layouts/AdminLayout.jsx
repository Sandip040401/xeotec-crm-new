import { Outlet } from "react-router";
import Sidebar from "../components/custom-components/Sidebar";
const AdminLayout = () => {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
