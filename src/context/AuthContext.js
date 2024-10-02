import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../pages/LoadingScreen";
import { checkAuth } from "../services/api/userApi";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    checkAuth(login, setLoading, logout, navigate, setError);
  }, [navigate]);
  const login = (userData) => {
    setUser(userData); // Set user data after login (this would include the role as well)
  };

  const logout = () => {
    setUser(null); // Clear user data on logout
  };
  if (loading) return <LoadingScreen />;
  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
