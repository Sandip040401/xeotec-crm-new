import { BrowserRouter as Router, Routes } from "react-router";
// import AdminRoutes from "./AdminRoutes";
import { GuestRoutes } from "./GuestRoutes";
import { AdminRoutes } from "./AdminRoutes";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {GuestRoutes}
        {AdminRoutes}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
