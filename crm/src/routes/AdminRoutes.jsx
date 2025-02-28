import AdminLayout from "@/layouts/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import Department from "@/pages/admin/department/Department";
import { Route } from "react-router";
import Role from "@/pages/admin/Role";
import AdminProfile from "@/pages/admin/profile/AdminProfile";
import Project from "@/pages/admin/Project";
import Employee from "@/pages/admin/Employee";
import Settings from "@/pages/admin/Settings";
import EmployeeOnboarding from "@/pages/user/NewEmployee";
export const AdminRoutes = [
  <Route element={<AdminLayout />} path="/admin" key={"admin"}>
    <Route path="" element={<Dashboard />} />
    <Route path="department" element={<Department />} />
    <Route path="role" element={<Role />} />
    <Route path="profile" element={<AdminProfile />} />
    <Route path="project" element={<Project />} />
    <Route path="employee" element={<Employee />} />
    <Route path="setting" element={<Settings />} />
    <Route path="department" element={<Department />} />
    <Route path="department" element={<Department />} />
    <Route path="department" element={<Department />} />
    <Route path="department" element={<Department />} />
    <Route path="add-employee" element={<EmployeeOnboarding />} />
  </Route>,
];
