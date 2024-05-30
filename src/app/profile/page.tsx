"use client";

import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import Layout from '../components/Layout';
import useAuth from '../hooks/useAuth';

interface DecodedToken {
    username: string;
    role: string;
    user: {
        id: number;
        username: string;
        email: string;
    };
}

const Profile: React.FC = () => {
    useAuth();

    const [user, setUser] = useState<DecodedToken | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode<DecodedToken>(token);
            setUser(decodedToken);
        }
    }, []);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await axios.post(`${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/api/logout`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
            localStorage.removeItem('token');
            window.location.href = '/';
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Logout failed:', error.response?.data?.message || error.message);
            } else {
                console.error('Logout failed:', error);
            }
        }
    };

    return (
        <Layout>
            {user ? (
                <div>
                    <p>Hello, {user.user.username}!</p>
                    <p>Your role is: {user.role}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <button 
                onClick={handleLogout} 
                className="block mt-4 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
                Logout
            </button>
        </Layout>
    );
};

export default Profile;
