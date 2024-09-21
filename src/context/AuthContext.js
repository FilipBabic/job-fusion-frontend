import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initially, the user is null (not logged in)

  const login = (userData) => {
    setUser(userData); // Set user data after login (this would include the role as well)
  };

  const logout = () => {
    setUser(null); // Clear user data on logout
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
