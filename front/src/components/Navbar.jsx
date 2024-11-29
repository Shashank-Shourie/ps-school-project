import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [profileOptions, setProfileOptions] = useState(false);

  const token = localStorage.getItem('token');

  const handleLogout = () => {
    const confirmation = window.confirm('Are you sure you want to log out?');
    if (confirmation) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      navigate('/signup');
    }
  };

  const handleDashboardClick = () => {
    if (!token) {
      navigate('/signup');
    } else {
      navigate('/dashboard');
    }
  };

  const handleChangeNameClick = () => {
    navigate('/changename');
  }
  const handleAIListClick = () => {
    if (!token) {
      navigate('/signup');
    } else {
      navigate('/ai');
    }
  };

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
          <button
            onClick={handleDashboardClick}
            className="font-medium text-gray-300 hover:text-gray-100 focus:outline-none"
          >
            Dashboard
          </button>
          <button
            onClick={handleAIListClick}
            className="font-medium text-gray-300 hover:text-gray-100 focus:outline-none"
          >
            Use AI
          </button>

          {token ? (
            <div className="relative">
              <button
                onClick={() => setProfileOptions((value) => !value)}
                className={`font-medium text-gray-300 hover:text-gray-100 focus:outline-none text-2xl transform transition-transform duration-300 ${
                  profileOptions ? 'rotate-90' : ''
                }`}
              >
                &#x2261;
              </button>
              {profileOptions && (
                <div className="absolute top-full mt-2 bg-black text-white shadow-lg rounded w-40 right-0">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 font-medium text-gray-300 hover:text-gray-100 hover:bg-gray-600 focus:outline-none"
                  >
                    Logout
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 font-medium text-gray-300 hover:text-gray-100 hover:bg-gray-600 focus:outline-none"
                    onClick={handleChangeNameClick}
                  >
                    Change Username
                  </button>
                </div>
              )}
            </div>
          ) : (
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
