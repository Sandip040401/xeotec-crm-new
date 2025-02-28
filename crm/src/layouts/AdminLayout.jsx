import { Outlet } from "react-router";
import Sidebar from "../components/custom-components/Sidebar";
import Header from "@/pages/admin/Header";
const AdminLayout = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      <div className="w-full  h-[90%] flex  ">
        <Sidebar />

        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
