import { useState } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState("bg-white");
  const changeBg = () => {
    setDarkMode(darkMode === "bg-white" ? "bg-gray-950" : "bg-white");
  };
  return (
    <div className={`h-full ${darkMode}`}>
      <Navbar darkMode={darkMode} changeBg={changeBg} />
      <main className={`w-full max-w-screen-lg mx-auto pb-6 px-4 lg:px-0`}>{children}</main>
    </div>
  );
};

export default Layout;
