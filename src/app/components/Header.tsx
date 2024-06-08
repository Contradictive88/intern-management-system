import React, { useState, useEffect } from 'react';
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { BiSolidUserCircle, BiChevronDown } from 'react-icons/bi';

interface DecodedToken {
    username: string;
    role: string;
    user: {
        id: number;
        username: string;
        email: string;
    };
}

interface HeaderProps {
    toggleSidebar: () => void;
    isRetracted: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isRetracted }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

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
        <header className="bg-gray-100 py-7 pl-7 pr-10 text-center flex justify-between">
            {isRetracted ? (
                <BiArrowToRight className="text-4xl cursor-pointer" onClick={toggleSidebar} />
            ) : (
                <BiArrowToLeft className="text-4xl cursor-pointer" onClick={toggleSidebar} />
            )}
            <div className="relative inline-block text-left">
                <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
                    <BiSolidUserCircle className="text-4xl mr-1" />
                    <BiChevronDown className="text-md" />
                </div>
                
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
    );
};

export default Header;
