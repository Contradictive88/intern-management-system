import React, { useEffect, useState } from 'react';
import { BiArrowToLeft, BiArrowToRight, BiSolidUserCircle, BiChevronDown } from 'react-icons/bi';
import { useSidebar } from '../context/SidebarContext';
import { useDropdown } from '../hooks/useDropdown';
import { getCookie, removeCookie } from '../utils/cookies';
import { jwtDecode } from 'jwt-decode';

interface HeaderProps {}

interface DecodedToken {
  username: string;
}

const Header: React.FC<HeaderProps> = () => {
  const { isSidebarRetracted, toggleSidebar } = useSidebar();
  const { isOpen, toggleDropdown, dropdownRef } = useDropdown();
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    // Get token from cookie
    const token: string | null = getCookie('auth_token') || null;

    if (token) {
      try {
        const decodedToken = jwtDecode<{ user: DecodedToken }>(token);
        setUser(decodedToken.user);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  // Construct the greeting message
  const greetingMessage = `Hi, ${user?.username || 'Guest'}!`;

  // Logout function
  const handleLogout = async () => {
    try {
      removeCookie('auth_token');
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // JSX for header component
  return (
    <>
      <header className="bg-gray-100 py-7 pl-7 pr-10 text-center flex justify-between">
        {isSidebarRetracted ? (
          <BiArrowToRight className="text-4xl cursor-pointer" onClick={toggleSidebar} />
        ) : (
          <BiArrowToLeft className="text-4xl cursor-pointer" onClick={toggleSidebar} />
        )}
        <div className="relative inline-block text-left">
          <div className="flex items-center space-x-2">
            <span className="text-md mr-4">{greetingMessage}</span>
            <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
              <BiSolidUserCircle className="text-4xl mr-1" />
              <BiChevronDown className="text-md" />
            </div>
          </div>
          {isOpen && (
            <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={handleLogout}>
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
