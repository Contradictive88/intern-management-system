import React from 'react';
import { BiArrowToLeft, BiArrowToRight, BiSolidUserCircle, BiChevronDown } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { useSidebar } from '../context/SidebarContext';
import { useDropdown } from '../hooks/useDropdown';
import { useUser, UserData } from '../context/UserContext';
import { removeCookie, getCookie } from '../utils/cookies';

const Header: React.FC = () => {
  const { isSidebarRetracted, toggleSidebar } = useSidebar();
  const { isOpen, toggleDropdown, dropdownRef } = useDropdown();
  const { user, loading, error } = useUser();

  // Function to format full name
  const getFullName = (userData: UserData | null): string => {
    if (!userData) return '';
    const { first_name, middle_name, last_name } = userData;
    return `${first_name} ${middle_name ? middle_name + ' ' : ''}${last_name}`;
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      const authToken = getCookie(document.cookie, 'auth_token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/api/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        credentials: 'include',
      });

      if (response.ok) {
        // Logout successful, remove the auth_token cookie
        removeCookie('auth_token'); // Assuming you have implemented a removeCookie function

        // Redirect to home page
        window.location.href = '/';
      } else {
        // Handle logout failure
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // JSX for the header component
  return (
    <>
      <header className="bg-gray-100 py-7 pl-7 pr-10 text-center flex justify-between">
        {isSidebarRetracted ? (
          <BiArrowToRight className="text-4xl cursor-pointer" onClick={toggleSidebar} />
        ) : (
          <BiArrowToLeft className="text-4xl cursor-pointer" onClick={toggleSidebar} />
        )}
        <div className="relative inline-block text-left">
          {loading ? (
            <div className="flex items-center space-x-2">
              <span className="text-md mr-4">Loading...</span>
              <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
                <BiSolidUserCircle className="text-4xl mr-1" />
                <BiChevronDown className="text-md" />
              </div>
            </div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="text-md mr-4">{`Hi, ${getFullName(user)}!`}</span>
              <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
                <BiSolidUserCircle className="text-4xl mr-1" />
                <BiChevronDown className="text-md" />
              </div>
            </div>
          )}
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
