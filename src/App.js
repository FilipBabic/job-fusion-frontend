import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import PrivateRoutes from "./components/PrivateRoutes";
import HeadAdmin from "./dashboards/HeadAdminDashboard";
import AdminDashboard from "./dashboards/AdminDashboard";
import RecruiterDahboard from "./dashboards/RecruiterDashboard";
import JobSeekerDashboard from "./dashboards/JobSeekerDashboard";
import Home from "./pages/Home";
import Organizations from "./pages/Organizatons";
import JobDetails from "./pages/JobDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import RegistrationSuccess from "./pages/RegistrationSuccess ";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route
          element={
            <PrivateRoutes allowedRoles={["head_admin", "admins", "recruiters", "job_seekers"]} />
          }
        >
          <Route path="/head-admin-dashboard" element={<HeadAdmin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/recruiter-dashboard" element={<RecruiterDahboard />} />
          <Route path="/job-seeker-dashboard" element={<JobSeekerDashboard />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/job-details/:id" element={<JobDetails />} />
        <Route path="/register" element={<Register role="job_seekers" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration-successful" element={<RegistrationSuccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};
export default App;
