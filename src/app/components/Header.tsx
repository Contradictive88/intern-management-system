import React, { useMemo } from 'react';
import { BiArrowToLeft, BiArrowToRight, BiSolidUserCircle, BiChevronDown } from "react-icons/bi";
import axios from 'axios';
import { useDropdown } from '../hooks/useDropdown';
import { jwtDecode } from 'jwt-decode';

interface HeaderProps {
    toggleSidebar: () => void;
    isRetracted: boolean;
}

interface DecodedToken {
    username: string;
    role: string;
    user: {
        id: number;
        username: string;
        email: string;
    };
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isRetracted }) => {
    const { isOpen, toggleDropdown, dropdownRef } = useDropdown();

    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
    };

    const token = getCookie('auth_token');

    // Declare variables for loading and user
    let loading = false;
    let user: DecodedToken | null = null;

    if (token) {
        try {
            const decodedToken = jwtDecode<DecodedToken>(token);
            // Assign values to variables
            user = decodedToken;
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    }

    // Use useMemo to memoize the greeting message
    const greetingMessage = useMemo(() => {
        return loading ? 'Loading...' : `Hi, ${user?.role || 'Guest'}!`;
    }, [loading, user?.role]);

    const handleLogout = async () => {
        try {
            // Send a logout request to the backend to clear the authentication token cookie
            await axios.post(`${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/api/logout`, {}, {
                withCredentials: true // Ensure cookies are sent with the request
            });
            // Redirect to the login page after successful logout
            window.location.href = '/';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <>
            <header className="bg-gray-100 py-7 pl-7 pr-10 text-center flex justify-between">
                {isRetracted ? (
                    <BiArrowToRight className="text-4xl cursor-pointer" onClick={toggleSidebar} />
                ) : (
                    <BiArrowToLeft className="text-4xl cursor-pointer" onClick={toggleSidebar} />
                )}
                <div className="relative inline-block text-left">
                    <div className="flex items-center space-x-2">
                        <span className="text-md mr-4">
                            {greetingMessage}
                        </span>

                        <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
                            <BiSolidUserCircle className="text-4xl mr-1" />
                            <BiChevronDown className="text-md" />
                        </div>
                    </div>

                    {isOpen && (
                        <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
};

export default Header;