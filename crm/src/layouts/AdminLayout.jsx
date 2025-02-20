import { Outlet } from "react-router";
import Sidebar from "../components/custom-components/Sidebar";
const AdminLayout = () => {
  return (
    <div className="w-screen h-screen flex ">
      <div className="w-[20%]">
        <Sidebar />
      </div>
      <div className="w-[80%]">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
