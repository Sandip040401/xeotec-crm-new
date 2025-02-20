import AdminLayout from "@/layouts/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import Department from "@/pages/admin/Department";
import { Route } from "react-router";
import Role from "@/pages/admin/Role";
export const AdminRoutes = [
  <Route element={<AdminLayout />} path="/admin" key={"admin"}>
    <Route path="" element={<Dashboard />} />
    <Route path="department" element={<Department />} />
    <Route path="role" element={<Role />} />
    <Route path="department" element={<Department />} />
    <Route path="department" element={<Department />} />
    <Route path="department" element={<Department />} />
    <Route path="department" element={<Department />} />
    <Route path="department" element={<Department />} />
    <Route path="department" element={<Department />} />
    <Route path="department" element={<Department />} />
    <Route path="department" element={<Department />} />
  </Route>,
];
