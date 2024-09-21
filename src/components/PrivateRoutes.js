import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoutes = ({ allowedRoles }) => {
  const { user } = useContext(AuthContext);
  return user && allowedRoles.includes(user.role) ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
