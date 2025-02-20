import { BrowserRouter as Router, Routes, Route } from "react-router";
// import AdminRoutes from "./AdminRoutes";
import AdminLogin from "@/pages/admin/AdminLogin";
import UserLogin from "@/pages/user/UserLogin";
import AdminLayout from "@/layouts/AdminLayout";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/admin-dashboard" element={<AdminLayout />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
