import { useState } from "react";
import Navbar from "./Navbar";
import Heading from "./Heading";

const Layout = ({ children, text }) => {
  const [darkMode, setDarkMode] = useState("bg-white");
  const changeBg = () => {
    setDarkMode(darkMode === "bg-white" ? "bg-gray-950" : "bg-white");
  };
  return (
    <div className={`h-full ${darkMode}`}>
      <Navbar darkMode={darkMode} changeBg={changeBg} />
      <Heading text={text} />
      <main className={`w-full max-w-screen-lg mx-auto pb-6 px-4 lg:px-0`}>{children}</main>
    </div>
  );
};

export default Layout;
