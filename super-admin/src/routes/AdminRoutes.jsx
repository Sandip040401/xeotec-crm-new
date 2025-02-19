import LandingPage from "@/pages/LandingPage";
import Login from "@/pages/Admin/Login";
import SignUp from "@/pages/Admin/SignUp";
import SLogin from "@/pages/SuperAdmin/SLogin";
import SSignUp from "@/pages/SuperAdmin/SSignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "@/layouts/Admin/Dashboard";

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
        <Route path="/admin-dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AdminRoutes;
