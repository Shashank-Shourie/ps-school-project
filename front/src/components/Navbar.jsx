import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Check if user is logged in
  const token = localStorage.getItem('token');
  
  const handleLogout = () => {
    const confirmation = window.confirm('Are you sure you want to log out?');
    
    if (confirmation) {
      // Remove token and user data from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('userId');

      // Redirect to the signup page or login page
      navigate('/signup');
    }
  };

  const LinkClass = ({ isActive }) => 
    isActive
      ? 'font-medium text-blue-400 hover:text-blue-300 focus:outline-none'
      : 'font-medium text-gray-300 hover:text-gray-100 focus:outline-none focus:text-gray-100';

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-gray-900 text-sm py-3 shadow-lg">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between z-50">
        <NavLink
          className="flex-none font-semibold text-xl text-white focus:outline-none focus:opacity-80"
          to="/"
          aria-label="Brand"
        >
          AI Blog
        </NavLink>

        <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
          <NavLink className={LinkClass} to="/Dashboard">
            Dashboard
          </NavLink>

          {token ? (
            // If user is logged in, show Logout button
            <button
              onClick={handleLogout}
              className="font-medium text-gray-300 hover:text-gray-100 focus:outline-none"
            >
              Logout
            </button>
          ) : (
            // If user is not logged in, show Account link
            <NavLink className={LinkClass} to="/signup">
              Account
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
