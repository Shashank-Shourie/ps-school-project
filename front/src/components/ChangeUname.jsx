import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

const ChangeUname = () => {
    const getUserId = () => localStorage.getItem('userId');

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        new_username: '',
        confirm_username: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if(formData.new_username!=formData.confirm_username){
                throw new Error('Confirm username and new username don\'t match');
            }
            const val = {
                username: formData.new_username,
                id: getUserId()
            }
            const response = await fetch('http://localhost:5000/api/auth/editusername', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(val)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Username Already Exists');
            }
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-start justify-center bg-gray-800 pt-0 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 mt-[-20px]">
                <div>
                    <h2 className="mt-9 text-center text-5xl font-mono font-bold text-white">
                        Edit username
                    </h2>
                </div>
                {error && (
                    <div className="bg-red-500 text-white p-3 rounded-md text-sm">
                        {error}
                    </div>
                )}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                                Username
                            </label>
                            <input
                                id="new_username"
                                name="new_username"
                                type="text"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Choose a username"
                                value={formData.new_username}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-300 mb-1">
                                Confirm Username
                            </label>
                            <input
                                id="confirm_username"
                                name="confirm_username"
                                type="text"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Confirm your username"
                                value={formData.confirm_username}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Save changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangeUname;