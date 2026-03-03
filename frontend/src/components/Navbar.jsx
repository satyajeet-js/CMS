import { Link, NavLink,Outlet } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/college management.png";
import Button from "../Pages/Button";
import Button2 from "../Pages/Button2";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200">
      <div className="flex items-center justify-between px-6 md:px-10 py-4 max-w-7xl mx-auto">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="College CMS Logo"
            className="h-10 w-10 object-contain"
          />
          <h2 className="text-xl font-semibold text-gray-900">
            College CMS
          </h2>
        </Link>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-5">
          <NavLink to="/login">
            <Button />
          </NavLink>
          <NavLink to="/register">
            <Button2 />
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-900 focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4">
          <NavLink
            to="/login"
            onClick={() => setOpen(false)}
            className="block"
          >
            <Button />
          </NavLink>

          <NavLink
            to="/register"
            onClick={() => setOpen(false)}
            className="block"
          >
            <Button2 />
          </NavLink>
        </div>
      )}
    </nav>

   

    </>
  );
};

export default Navbar;
  