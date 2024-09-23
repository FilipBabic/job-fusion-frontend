import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
import Logo from "../assets/logos/job-fusion-logo-800x160.png";

const Navbar = ({ darkMode, changeBg }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`${darkMode} py-4 border-b`}>
      <div className="flex w-full justify-around items-center">
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-violet-800 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <nav className="hidden md:flex space-x-4 ml-2 text-lg">
          <Link to="/" className="text-violet-800">
            Home
          </Link>
          <Link to="/" className="text-violet-800">
            Jobs
          </Link>
          <Link to="/companies" className="text-violet-800">
            Companies
          </Link>
        </nav>
        <div className="flex flex-row items-center">
          <div className="text-violet-800 text-lg font-bold">
            <img src={`${Logo}`} className="h-10" alt="Navbar Logo" />
          </div>
        </div>
        <div className="flex flex-row">
          <button
            onClick={() => changeBg()}
            className="hidden md:flex border border-violet-900 text-violet-900 py-1 px-2 mr-2 rounded"
          >
            {darkMode === "bg-white" ? <SunIcon height={24} /> : <MoonIcon height={24} />}
          </button>
          <Button>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-500">
          <nav className="flex flex-col space-y-2 p-4">
            <Link to="/" className="text-violet-800">
              Home
            </Link>
            <Link to="/" className="text-violet-800">
              Jobs
            </Link>
            <Link to="/companies" className="text-violet-800">
              Companies
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
