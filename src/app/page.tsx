"use client";

import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    // State hooks to manage username and password input values
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    /**
     * Handles the form submission for login.
     * 
     * @param {React.FormEvent<HTMLFormElement>} e - The form submission event
     */
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent the default form submission behavior
        e.preventDefault();
        
        try {
            // Send a POST request to the login API endpoint with the username and password
            const response = await axios.post(`${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/api/login`, { username, password });
            
            // Extract the token from the response
            const { token } = response.data;
            
            // Store the token in local storage
            localStorage.setItem('token', token);
            
            // Redirect to the profile page
            window.location.href = '/profile';
        } catch (error) {
            // Handle any errors that occur during the login process
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Login failed. Please try again.'); // Set error message
            } else {
                setError('Login failed. Please try again.'); // Set generic error message
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-10 bg-gray-300 rounded-md">
                <div>
                    <h1 className="text-center text-3xl font-extrabold text-gray-900">Login</h1>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm mt-2 text-right">
                            {error}
                        </div>
                    )}
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;