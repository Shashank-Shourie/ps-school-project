import React from 'react';
import { useNavigate } from 'react-router-dom';

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

  // Redirect to signup if user is not logged in
  const handleDashboardClick = () => {
    if (!token) {
      navigate('/signup');
    } else {
      navigate('/dashboard');
    }
  };

  const handleAIListClick = () => {
    if (!token) {
      navigate('/signup');
    } else {
      navigate('/ai');
    }
  };

  const LinkClass = ({ isActive }) => 
    isActive
      ? 'font-medium text-blue-400 hover:text-blue-300 focus:outline-none'
      : 'font-medium text-gray-300 hover:text-gray-100 focus:outline-none focus:text-gray-100';

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-gray-900 text-sm py-3 shadow-lg">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between z-50">
        <button
          className="flex-none font-semibold text-xl text-white focus:outline-none focus:opacity-80"
          onClick={() => navigate('/')}
          aria-label="Brand"
        >
          AI Blog
        </button>

        <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
          {/* Dashboard link changed to a button */}
          <button
            onClick={handleDashboardClick}
            className="font-medium text-gray-300 hover:text-gray-100 focus:outline-none"
          >
            Dashboard
          </button>

          {/* AI List link */}
          <button
            onClick={handleAIListClick}
            className="font-medium text-gray-300 hover:text-gray-100 focus:outline-none"
          >
            Use AI
          </button>

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
            <button
              onClick={() => navigate('/signup')}
              className="font-medium text-gray-300 hover:text-gray-100 focus:outline-none"
            >
              Account
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
