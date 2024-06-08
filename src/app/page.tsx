"use client"

import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
    // State hooks to manage username, password input values, and error messages
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    /**
     * Handles the form submission for login.
     * 
     * @param {React.FormEvent<HTMLFormElement>} e - The form submission event
     */
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/api/login`, { username, password });
    
            if (response.status === 200) {
                const { token } = response.data;

                // Set the token as a cookie using js-cookie
                Cookies.set('auth_token', token, {
                    expires: 7, // 1 week
                    secure: process.env.NODE_ENV !== 'development', // Secure flag should be true in production
                    sameSite: 'strict',
                });

                // Redirect to the profile page
                window.location.href = '/profile';
            } else {
                setError('Login failed. Please try again.');
            }
        } catch (error) {
            // Handle login errors
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Login failed. Please try again.');
            } else {
                setError('Login failed. Please try again.');
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