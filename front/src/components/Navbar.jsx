import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [profileOptions, setProfileOptions] = useState(false);

  const token = localStorage.getItem('token');

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      navigate('/signup');
    }
  };

  const toggleProfileOptions = () => {
    setProfileOptions((prev) => !prev);
  };

  const controlNavbar = () => {
    // Prevent navbar from hiding when the menu is open
    if (profileOptions) return;

    if (window.scrollY > lastScrollY) {
      // Scrolling down
      setShowNavbar(false);
    } else {
      // Scrolling up
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY, profileOptions]);

  return (
    <header
      className={`${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      } transition-transform duration-300 sticky top-0 z-50 bg-gray-900 text-sm py-3 shadow-lg`}
    >
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
        <button
          className="flex-none font-semibold text-xl text-white focus:outline-none focus:opacity-80"
          onClick={() => navigate('/')}
          aria-label="Brand"
        >
          AI Blog
        </button>

        <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
          <button
            onClick={() => (token ? navigate('/dashboard') : navigate('/signup'))}
            className="font-medium text-gray-300 hover:text-gray-100 focus:outline-none"
          >
            Dashboard
          </button>
          <button
            onClick={() => (token ? navigate('/ai') : navigate('/signup'))}
            className="font-medium text-gray-300 hover:text-gray-100 focus:outline-none"
          >
            Use AI
          </button>

          {token ? (
            <div className="relative">
              <button
                onClick={toggleProfileOptions}
                className="font-medium text-gray-300 hover:text-gray-100 focus:outline-none text-2xl"
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
                    onClick={() => navigate('/changename')}
                    className="block w-full text-left px-4 py-2 font-medium text-gray-300 hover:text-gray-100 hover:bg-gray-600 focus:outline-none"
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
