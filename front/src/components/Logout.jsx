import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored data like tokens, userId, etc.
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    // Navigate to login or home page after logout
    navigate('/login');
  };

  const cancelLogout = () => {
    // If the user cancels, navigate back to dashboard or home
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-white text-2xl font-bold mb-4">Are you sure you want to log out?</h1>
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
          <button
            onClick={cancelLogout}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
