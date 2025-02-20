import LandingPage from "@/pages/LandingPage";
import Login from "@/pages/Admin/Login";
import SignUp from "@/pages/Admin/SignUp";
import SLogin from "@/pages/SuperAdmin/SLogin";
import SSignUp from "@/pages/SuperAdmin/SSignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuperAdminProfile from "@/pages/SuperAdmin/SuperAdminProfile";
import SuperAdminDashboard from "@/pages/SuperAdmin/SuperAdminDashboard";
import SuperAdminLayout from "@/layouts/SuperAdmin/SuperAdminLayout";
import AdminLayout from "@/layouts/Admin/AdminLayout";
import SuperAdminSettings from "@/pages/SuperAdmin/SuperAdminSettings";

const AdminRoutes = () => {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/super-admin-login" element={<SLogin />} />
        <Route path="/super-admin-signup" element={<SSignUp />} />
        <Route path="/admin-dashboard" element={<AdminLayout />} />

        <Route path="/super-admin-dashboard" element={<SuperAdminLayout />}>
          <Route index element={<SuperAdminDashboard />} />
          <Route path="profile" element={<SuperAdminProfile />} />
          <Route path="settings" element={<SuperAdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AdminRoutes;
