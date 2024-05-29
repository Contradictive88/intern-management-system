"use client";
import axios from 'axios';

export default function Profile() {
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
        <>
            <span>Hello World</span>
            <button onClick={handleLogout} className="block mt-4 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
                Logout
            </button>
        </>
    );
}
