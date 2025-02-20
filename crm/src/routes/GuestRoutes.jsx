import { Route } from "react-router";
import AdminLogin from "@/pages/admin/AdminLogin";
import UserLogin from "@/pages/user/UserLogin";
import GuestLayout from "@/layouts/GuestLayout";
export const GuestRoutes = (
  <Route element={<GuestLayout />} key={"guest"}>
    <Route path="admin-login" element={<AdminLogin />} />
    <Route path="user-login" element={<UserLogin />} />
  </Route>
);
