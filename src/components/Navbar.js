import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { SunIcon, MoonIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = ({ darkMode, changeBg }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`${darkMode} py-2 border-b border-dotted`}>
      <div className="flex w-full justify-between md:justify-around items-center">
        <div className="hidden md:flex flex-row items-center">
          <div className="flex flex-row space-x-1 text-blue-700 hover:text-gray-700">
            <button>
              <Link to="/">
                <HomeIcon height={28}>Home</HomeIcon>
              </Link>
            </button>
          </div>

          <nav className="hidden md:flex space-x-4 ml-2">
            <Link to="/" className="text-blue-700 text-lg hover:text-gray-700">
              Jobs
            </Link>
            <Link to="/organizations" className="text-violet-700 text-lg hover:text-gray-700">
              Organizations
            </Link>
          </nav>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="px-2 py-2 text-blue-700">
            <Bars3Icon height={28} />
          </button>
        </div>
        {/* <div>
          <img src={`${Logo}`} className="h-10" alt="Navbar Logo" />
        </div> */}
        <div className="flex flex-row">
          <div className="hidden md:flex text-blue-500">
            {darkMode === "bg-white" ? (
              <button
                className=" px-1 text-blue-700 hover:text-gray-700"
                onClick={() => changeBg()}
              >
                <SunIcon height={24} />
              </button>
            ) : (
              <button
                className=" px-2 text-blue-700 hover:text-gray-700"
                onClick={() => changeBg()}
              >
                <MoonIcon height={24} />
              </button>
            )}
          </div>
          {user && <ProfileDropdown />}

          {!user && (
            <>
              <button className="mx-1 px-2 py-1 bg-blue-700 text-white rounded hover:bg-blue-800">
                <Link to="/login" state={`job_seekers`}>
                  Job seekers
                </Link>
              </button>
              <button className="mx-1 px-2 py-1 bg-violet-700 text-white rounded hover:bg-violet-800">
                <Link to="/login" state={`recruiters`}>
                  Recruiters
                </Link>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col space-y-2 p-4">
            <Link to="/" className="text-blue-700">
              Jobs
            </Link>
            <Link to="/organizations" className="text-violet-700">
              Companies
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
